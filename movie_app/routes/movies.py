from flask_restful import Resource
from flask import request
from models import db, Movie
from schemas import MovieSchema
from marshmallow import ValidationError

class MovieListResource(Resource):
    def post(self):
        """Add a new movie."""
        schema = MovieSchema()
        try:
            # Deserialize the request and create a Movie instance
            movie = schema.load(request.json, session=db.session)
        except ValidationError as e:
            return {"error": e.messages}, 400

        # Add to database and commit
        db.session.add(movie)
        db.session.commit()
        return schema.dump(movie), 201


class MovieResource(Resource):
    def get(self, movie_id):
        """Fetch a single movie by ID."""
        # Retrieve the movie by ID or return 404 if not found
        movie = Movie.query.get_or_404(movie_id)
        schema = MovieSchema()
        return schema.dump(movie), 200

    def put(self, movie_id):
        """Update a movie."""
        # Retrieve the movie by ID or return 404 if not found
        movie = Movie.query.get_or_404(movie_id)
        schema = MovieSchema()

        try:
            # Load partial data for update
            update_data = schema.load(request.json, partial=True, session=db.session)
        except ValidationError as e:
            return {"error": e.messages}, 400

        # Update fields dynamically
        for key, value in update_data.items():
            setattr(movie, key, value)

        db.session.commit()
        return schema.dump(movie), 200

class ViewMoviesByProfitResource(Resource):
    def get(self):
        """
        View movies with profit greater than the specified amount.
        Query parameter: ?min_profit=<value>
        """
        min_profit = request.args.get("min_profit", type=float)
        if min_profit is None:
            return {"error": "Query parameter 'min_profit' is required."}, 400

        movies = Movie.query.filter(Movie.profit > min_profit).all()
        schema = MovieSchema(many=True)
        return schema.dump(movies), 200
    
from flask_restful import Resource
from models import Movie, Genre, MovieGenre
from schemas import MovieSchema

class ViewMoviesByGenreResource(Resource):
    def get(self, genre_name):
        """
        View movies by genre.
        Path parameter: <genre_name>
        """
        genre = Genre.query.filter_by(name=genre_name).first()
        if not genre:
            return {"error": f"Genre '{genre_name}' does not exist."}, 404

        movies = Movie.query.join(MovieGenre).filter(MovieGenre.genre_id == genre.id).all()
        schema = MovieSchema(many=True)
        return schema.dump(movies), 200