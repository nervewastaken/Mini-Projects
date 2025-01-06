from flask_restful import Resource
from flask import request
from models import db, Genre, MovieGenre, Movie
from marshmallow import ValidationError

class GenreListResource(Resource):
    def get(self):
        """Fetch all genres."""
        genres = Genre.query.all()
        return [{"id": genre.id, "name": genre.name} for genre in genres], 200

    def post(self):
        """Add a new genre."""
        data = request.json
        if not data or "name" not in data:
            return {"error": "Genre name is required."}, 400

        # Check if genre already exists
        existing_genre = Genre.query.filter_by(name=data["name"]).first()
        if existing_genre:
            return {"error": "Genre already exists."}, 400

        # Add new genre
        try:
            genre = Genre(name=data["name"])
            db.session.add(genre)
            db.session.commit()
            return {"id": genre.id, "name": genre.name}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"An error occurred: {str(e)}"}, 500


class AssignGenreToMovieResource(Resource):
    def post(self, movie_id):
        """Assign genres to a movie by its ID."""
        # Fetch the movie by ID
        movie = Movie.query.get_or_404(movie_id)

        data = request.json
        if not data or "genres" not in data:
            return {"error": "Genres list is required."}, 400

        # Assign genres to the movie
        try:
            for genre_id in data["genres"]:
                genre = Genre.query.get(genre_id)
                if not genre:
                    return {"error": f"Genre with ID {genre_id} does not exist."}, 400

                # Check for duplicate assignments
                existing_assignment = MovieGenre.query.filter_by(movie_id=movie.id, genre_id=genre.id).first()
                if existing_assignment:
                    continue  # Skip if already assigned

                movie_genre = MovieGenre(movie_id=movie.id, genre_id=genre.id)
                db.session.add(movie_genre)

            db.session.commit()
            return {
                "message": f"Genres assigned to movie '{movie.name}' successfully.",
                "movie_name": movie.name
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"An error occurred: {str(e)}"}, 500


class DeleteGenreResource(Resource):
    def delete(self, genre_id):
        """Delete a genre if no movies are associated."""
        genre = Genre.query.get_or_404(genre_id)

        # Check if the genre is associated with any movies
        associated_movies = MovieGenre.query.filter_by(genre_id=genre_id).first()
        if associated_movies:
            return {"error": "Cannot delete genre associated with movies."}, 400

        # Delete the genre
        try:
            db.session.delete(genre)
            db.session.commit()
            return {"message": "Genre deleted successfully."}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": f"An error occurred: {str(e)}"}, 500