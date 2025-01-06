from flask_restful import Api
from routes.movies import MovieListResource, MovieResource, ViewMoviesByGenreResource, ViewMoviesByProfitResource
from routes.actors import DeleteActorResource, AddActorResource, GetActorResource, MapActorToMovieResource, ViewActorsWithMoviesResource # Include AddActorResource if needed
from routes.genres import GenreListResource, AssignGenreToMovieResource, DeleteGenreResource
from routes.crew import GetCrewPerMovieResource,AddCrewToMovieResource,CreateWorkResource,DeleteCrewResource,DeleteWorkResource, AddCrewResource

def register_routes(api: Api):
    # Movies-related endpoints
    api.add_resource(MovieListResource, "/movies")
    api.add_resource(MovieResource, "/movies/<int:movie_id>")
    api.add_resource(MapActorToMovieResource, "/movies/<int:movie_id>/actors")
    api.add_resource(ViewMoviesByGenreResource, "/movies-by-genre/<string:genre_name>")
    api.add_resource(ViewMoviesByProfitResource, "/movies-by-profit")

     # Actors-related endpoints
    api.add_resource(AddActorResource, "/actors")
    api.add_resource(DeleteActorResource, "/actors/<int:actor_id>")
    api.add_resource(GetActorResource, "/actors/<int:actor_id>")
    api.add_resource(ViewActorsWithMoviesResource, "/actors-with-movies")

    # Genres-related endpoints
    api.add_resource(GenreListResource, "/genres")
    api.add_resource(AssignGenreToMovieResource, "/genres/movies/<int:movie_id>")
    api.add_resource(DeleteGenreResource, "/genres/<int:genre_id>")
    
    # Crew and Work-related routes
    api.add_resource(AddCrewResource, "/crew")
    api.add_resource(GetCrewPerMovieResource, "/movies/<int:movie_id>/crew")
    api.add_resource(AddCrewToMovieResource, "/movies/<int:movie_id>/crew")
    api.add_resource(CreateWorkResource, "/works")
    api.add_resource(DeleteWorkResource, "/works/<int:work_id>")
    api.add_resource(DeleteCrewResource, "/crew/<int:crew_id>")