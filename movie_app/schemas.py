from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models import Movie, Actor, Work, Crew, db  # Import db for the session
from marshmallow import fields

class MovieSchema(SQLAlchemySchema):
    class Meta:
        model = Movie
        load_instance = True
        sqla_session = db.session

    id = auto_field(dump_only=True)
    name = auto_field(required=True)
    release_date = auto_field(required=True)
    profit = auto_field()

class ActorSchema(SQLAlchemySchema):
    class Meta:
        model = Actor
        load_instance = True
        sqla_session = db.session

    id = auto_field(dump_only=True)
    name = auto_field(required=True)
    birth_date = auto_field()
    movies_played = fields.Method("get_movies_played", dump_only=True)

    def get_movies_played(self, actor):
        """Fetch a list of movies the actor has played in."""
        return [movie.name for movie in actor.movies]
    
class WorkSchema(SQLAlchemySchema):
    class Meta:
        model = Work
        load_instance = True
        sqla_session = db.session

    id = auto_field(dump_only=True)
    name = auto_field(required=True)

class CrewSchema(SQLAlchemySchema):
    class Meta:
        model = Crew
        load_instance = True
        sqla_session = db.session

    id = auto_field(dump_only=True)
    name = auto_field(required=True)
    work_id = auto_field(required=True)
    work = fields.Nested(WorkSchema, dump_only=True)
    movies_worked_in = fields.Method("get_movies_worked_in", dump_only=True)
    current_pay = auto_field(required=True)
    location = auto_field(required=True)
    availability = auto_field()

    def get_movies_worked_in(self, crew):
        """Fetch a list of movies the crew member has worked in."""
        if not crew.movies_worked_in:
            return []
        movie_ids = [int(mid) for mid in crew.movies_worked_in.split(",")]
        movies = Movie.query.filter(Movie.id.in_(movie_ids)).all()
        return [movie.name for movie in movies]