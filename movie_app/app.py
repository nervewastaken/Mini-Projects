from flask import Flask, jsonify
from flask_restful import Api
from marshmallow import ValidationError
from models import db
from routes import register_routes
from config import Config

def create_app():
    """Create and configure the Flask app."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    api = Api(app)

    # Register all routes
    register_routes(api)

    # Create tables in the database
    with app.app_context():
        db.create_all()

    @app.errorhandler(ValidationError)
    def handle_validation_error(err):
        """Handle marshmallow validation errors."""
        return jsonify({"error": err.messages}), 400

    @app.errorhandler(404)
    def handle_not_found_error(err):
        """Handle 404 errors."""
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def handle_internal_error(err):
        """Handle server errors."""
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)