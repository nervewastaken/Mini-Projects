from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Movies table
class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    profit = db.Column(db.Float)  # In million dollars

# Genres table
class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

class MovieGenre(db.Model):
    __tablename__ = 'movie_genres'
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), primary_key=True)

# Actors table
class Actor(db.Model):
    __tablename__ = 'actors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    birth_date = db.Column(db.Date)
    movies = db.relationship('Movie', secondary='movie_actors', backref='actors')

# Association table for actors and movies
class MovieActor(db.Model):
    __tablename__ = 'movie_actors'
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), primary_key=True)
    actor_id = db.Column(db.Integer, db.ForeignKey('actors.id'), primary_key=True)


# Ratings table
class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    provider = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False)

class Producer(db.Model):
    __tablename__ = 'producers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255))

class MovieProducer(db.Model):
    __tablename__ = 'movie_producers'
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), primary_key=True)
    producer_id = db.Column(db.Integer, db.ForeignKey('producers.id'), primary_key=True)
    
class Work(db.Model):
    __tablename__ = 'works'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)  # Type of work


class Crew(db.Model):
    __tablename__ = 'crew'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    work_id = db.Column(db.Integer, db.ForeignKey('works.id'), nullable=False)  # Foreign key to Work table
    movies_worked_in = db.Column(db.String(255))  # Comma-separated movie IDs
    current_pay = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    availability = db.Column(db.Boolean, default=True)

    # Relationships
    work = db.relationship('Work', backref='crew_members', lazy=True)