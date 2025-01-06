from flask_restful import Resource
from flask import request
from models import db, Work, Crew, Movie
from schemas import CrewSchema, WorkSchema
from sqlalchemy.exc import IntegrityError

crew_schema = CrewSchema()
crews_schema = CrewSchema(many=True)
work_schema = WorkSchema()
works_schema = WorkSchema(many=True)

class AddCrewResource(Resource):
    def post(self):
        """Add a new crew member."""
        data = request.json

        # Validate payload
        name = data.get("name")
        work_id = data.get("work_id")
        current_pay = data.get("current_pay")
        location = data.get("location")
        availability = data.get("availability")

        if not all([name, work_id, current_pay, location, availability is not None]):
            return {"error": "All fields are required."}, 400

        try:
            new_crew = Crew(
                name=name,
                work_id=work_id,
                current_pay=current_pay,
                location=location,
                availability=availability
            )
            db.session.add(new_crew)
            db.session.commit()
            return crew_schema.dump(new_crew), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"error": "Database integrity error: " + str(e)}, 500
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class GetCrewPerMovieResource(Resource):
    def get(self, movie_id):
        """Fetch all crew members who worked on a specific movie."""
        movie = Movie.query.get_or_404(movie_id)
        crew_members = Crew.query.filter(Crew.movies_worked_in.like(f"%{movie_id}%")).all()
        return crews_schema.dump(crew_members), 200

class AddCrewToMovieResource(Resource):
    def post(self, movie_id):
        """Assign a crew member to a specific movie."""
        movie = Movie.query.get_or_404(movie_id)
        data = request.json
        crew_id = data.get('crew_id')

        if not crew_id:
            return {"error": "Crew ID is required."}, 400

        crew = Crew.query.get_or_404(crew_id)
        movies = crew.movies_worked_in.split(",") if crew.movies_worked_in else []
        if str(movie_id) in movies:
            return {"error": "Crew member is already assigned to this movie."}, 400

        try:
            movies.append(str(movie_id))
            crew.movies_worked_in = ",".join(movies)
            db.session.commit()
            return {"message": f"Crew member {crew.name} added to movie '{movie.name}'."}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class CreateWorkResource(Resource):
    def post(self):
        """Add a new type of work."""
        data = request.json
        name = data.get('name')

        if not name:
            return {"error": "Work name is required."}, 400

        existing_work = Work.query.filter_by(name=name).first()
        if existing_work:
            return {"error": "Work already exists."}, 400

        try:
            new_work = Work(name=name)
            db.session.add(new_work)
            db.session.commit()
            return work_schema.dump(new_work), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"error": "Database integrity error: " + str(e)}, 500
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class DeleteWorkResource(Resource):
    def delete(self, work_id):
        """Delete a work type if no crew members are dependent on it."""
        work = Work.query.get_or_404(work_id)

        dependent_crew = Crew.query.filter_by(work_id=work.id).first()
        if dependent_crew:
            return {"error": "Cannot delete work type as it is assigned to crew members."}, 400

        try:
            db.session.delete(work)
            db.session.commit()
            return {"message": "Work deleted successfully."}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class DeleteCrewResource(Resource):
    def delete(self, crew_id):
        """Delete a crew member."""
        crew = Crew.query.get_or_404(crew_id)

        try:
            db.session.delete(crew)
            db.session.commit()
            return {"message": f"Crew member {crew.name} deleted successfully."}, 200
        except IntegrityError as e:
            db.session.rollback()
            return {"error": "Database integrity error: " + str(e)}, 500
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500