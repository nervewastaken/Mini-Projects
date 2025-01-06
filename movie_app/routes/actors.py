from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import db, Actor, Movie, MovieActor
from schemas import ActorSchema


class AddActorResource(Resource):
    def post(self):
        """Add a new actor."""
        schema = ActorSchema()  # Use ActorSchema for validation and serialization
        try:
            # Deserialize and validate the incoming data
            actor = schema.load(request.json, session=db.session)  # This returns an Actor instance
        except ValidationError as e:
            return {"error": e.messages}, 400

        # Add the actor to the database
        try:
            db.session.add(actor)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"error": f"An error occurred while adding the actor: {str(e)}"}, 500

        return schema.dump(actor), 201  # Return the newly created actor
    
class DeleteActorResource(Resource):
    def delete(self, actor_id):
        """Delete an actor if they are not associated with any movies."""
        actor = Actor.query.get_or_404(actor_id)

        # Check if the actor is associated with any movies
        associated_movies = MovieActor.query.filter_by(actor_id=actor.id).first()
        if associated_movies:
            return {"error": "Cannot delete actor associated with movies."}, 400

        try:
            db.session.delete(actor)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"error": f"An error occurred while deleting the actor: {str(e)}"}, 500

        return {"message": "Actor deleted successfully."}, 200

class GetActorResource(Resource):
    def get(self, actor_id):
        """Fetch details of an actor along with their movies."""
        actor = Actor.query.get_or_404(actor_id)
        schema = ActorSchema()
        return schema.dump(actor), 200

class MapActorToMovieResource(Resource):
    def post(self, movie_id):
        """Map one or more actors to a movie."""
        # Fetch the movie by ID
        movie = Movie.query.get_or_404(movie_id)

        data = request.json
        if not data or "actors" not in data:
            return {"error": "Actors list is required."}, 400

        actor_ids = data["actors"]

        # Validate actor IDs
        valid_actors = []
        for actor_id in actor_ids:
            actor = Actor.query.get(actor_id)
            if not actor:
                return {"error": f"Actor with ID {actor_id} does not exist."}, 404
            valid_actors.append(actor)

        # Map actors to the movie
        try:
            for actor in valid_actors:
                # Check if mapping already exists
                existing_mapping = MovieActor.query.filter_by(movie_id=movie.id, actor_id=actor.id).first()
                if not existing_mapping:
                    mapping = MovieActor(movie_id=movie.id, actor_id=actor.id)
                    db.session.add(mapping)

            db.session.commit()
            return {"message": f"Actors successfully mapped to movie '{movie.name}'."}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"An error occurred: {str(e)}"}, 500

class ViewActorsWithMoviesResource(Resource):
    def get(self):
        """
        View all actors along with the movies they've played in.
        """
        actors = Actor.query.all()
        schema = ActorSchema(many=True)
        return schema.dump(actors), 200