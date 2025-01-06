API Documentation for Movie Management System

Overview

This API provides functionality for managing movies, genres, actors, and related data. The API supports CRUD operations and advanced querying capabilities for movies and associated entities.

How to run 
1) Pull the repo
2) navigate to project folder
```bash
cd movie_app
```
3) create a python virtual env in the folder itself
```bash
python3 -m venv .
```
4) install dependencies
```bash
pip install -r requirements.txt
```
5) run the app
```bash
python app.py
```

Runs on http://127.0.0.1:5000.
Add endpoints as needed

Syntax to use curl
```bash
curl -X GET http://127.0.0.1:5000/movies

#add a movie

curl -X POST http://localhost:5000/movies \
-H "Content-Type: application/json" \
-d '{
  "name": "Inception",
  "release_date": "2010-07-16",
  "profit": 830.0
}'

#add an actor

curl -X POST http://localhost:5000/actors \
-H "Content-Type: application/json" \
-d '{
  "name": "Leonardo DiCaprio",
  "birth_date": "1974-11-11"
}'

#map actor to a movie

curl -X POST http://localhost:5000/movies/1/actors \
-H "Content-Type: application/json" \
-d '{
  "actors": [1, 2, 3]
}'

#add a genre
curl -X POST http://localhost:5000/genres \
-H "Content-Type: application/json" \
-d '{
  "name": "Science Fiction"
}'

#assign genre to a movie

curl -X POST http://localhost:5000/genres/movies/1 \
-H "Content-Type: application/json" \
-d '{
  "genres": [1, 2]
}'

#this is an example API use, other API endpoints may need more data
```

Movies Endpoints

GET /movies

	•	Description: Fetch all movies with optional filters like actor and director.

POST /movies

	•	Description: Add a new movie to the database.

GET /movies/<int:movie_id>

	•	Description: Fetch details of a single movie by its ID.

PUT /movies/<int:movie_id>

	•	Description: Update details of an existing movie by its ID.

POST /movies/<int:movie_id>/actors

	•	Description: Map one or more actors to a movie by its ID.

GET /movies-by-genre/<string:genre_name>

	•	Description: Fetch all movies belonging to a specific genre.

GET /movies-by-profit

	•	Description: Fetch movies with profits greater than a specified value. Requires a query parameter ?min_profit=<value>.

Actors Endpoints

POST /actors

	•	Description: Add a new actor to the database.

DELETE /actors/<int:actor_id>

	•	Description: Delete an actor if they are not associated with any movies.

GET /actors/<int:actor_id>

	•	Description: Fetch details of a specific actor by their ID.

GET /actors-with-movies

	•	Description: Fetch all actors along with the movies they have acted in.

Genres Endpoints

GET /genres

	•	Description: Fetch all genres available in the database.

POST /genres

	•	Description: Add a new genre to the database.

POST /genres/movies/<int:movie_id>

	•	Description: Assign one or more genres to a movie by its ID.

DELETE /genres/<int:genre_id>

	•	Description: Delete a genre if it is not associated with any movies.

Additional Information

	•	Ensure to include all required parameters in the request.
	•	All endpoints return JSON responses.
	•	Errors are returned in the format:

{
    "error": "Description of the error."
}

Crew Endpoints

1. Add a New Crew Member

Endpoint: POST /crew

Description: Adds a new crew member to the database.

Request:

	•	Method: POST
	•	Headers: Content-Type: application/json
	•	Body:

{
  "name": "John Doe",
  "work_id": 1,
  "current_pay": 500.0,
  "location": "New York",
  "availability": true
}



cURL Example:

curl -X POST http://127.0.0.1:5000/crew \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "work_id": 1,
  "current_pay": 500.0,
  "location": "New York",
  "availability": true
}'

Response:

{
  "id": 1,
  "name": "John Doe",
  "work_id": 1,
  "current_pay": 500.0,
  "location": "New York",
  "availability": true
}

2. Assign Crew to a Movie

Endpoint: POST /movies/<int:movie_id>/crew

Description: Maps a crew member to a specific movie.

Request:

	•	Method: POST
	•	Headers: Content-Type: application/json
	•	Path Parameters:
	•	movie_id - The ID of the movie to which the crew is assigned.
	•	Body:

{
  "crew_id": 1
}



cURL Example:

curl -X POST http://127.0.0.1:5000/movies/1/crew \
-H "Content-Type: application/json" \
-d '{
  "crew_id": 1
}'

Response:

{
  "message": "Crew member John Doe added to movie 'Movie Name'."
}

3. Get Crew Members for a Movie

Endpoint: GET /movies/<int:movie_id>/crew

Description: Retrieves all crew members assigned to a specific movie.

Request:

	•	Method: GET
	•	Path Parameters:
	•	movie_id - The ID of the movie.

cURL Example:

curl -X GET http://127.0.0.1:5000/movies/1/crew

Response:

[
  {
    "id": 1,
    "name": "John Doe",
    "work": "Lighting",
    "current_pay": 500.0,
    "location": "New York",
    "availability": true
  }
]

4. Delete a Crew Member

Endpoint: DELETE /crew/<int:crew_id>

Description: Deletes a crew member from the database.

Request:

	•	Method: DELETE
	•	Path Parameters:
	•	crew_id - The ID of the crew member to delete.

cURL Example:

curl -X DELETE http://127.0.0.1:5000/crew/1

Response:

{
  "message": "Crew member John Doe deleted successfully."
}

Work Endpoints

1. Add a New Work Type

Endpoint: POST /works

Description: Adds a new work type (e.g., Lighting, Makeup).

Request:

	•	Method: POST
	•	Headers: Content-Type: application/json
	•	Body:

{
  "name": "Lighting"
}



cURL Example:

curl -X POST http://127.0.0.1:5000/works \
-H "Content-Type: application/json" \
-d '{
  "name": "Lighting"
}'

Response:

{
  "id": 1,
  "name": "Lighting"
}

2. Delete a Work Type

Endpoint: DELETE /works/<int:work_id>

Description: Deletes a work type if no crew members are assigned to it.

Request:

	•	Method: DELETE
	•	Path Parameters:
	•	work_id - The ID of the work type to delete.

cURL Example:

curl -X DELETE http://127.0.0.1:5000/works/1

Response:

	•	If successful:

{
  "message": "Work deleted successfully."
}


	•	If crew members are assigned:

{
  "error": "Cannot delete work type as it is assigned to crew members."
}

Edge Case Responses

	1.	Crew ID does not exist (Mapping Crew to Movie):

{
  "error": "404 Not Found: Crew not found."
}


	2.	Work Type already exists:

{
  "error": "Work already exists."
}


	3.	Crew already assigned to a movie:

{
  "error": "Crew member is already assigned to this movie."
}

Feel free to check out the repository for the complete source code!
