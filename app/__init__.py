"""
Flask application factory for JanNetra.
"""

import logging
import os

from flask import Flask, jsonify
from flask_cors import CORS

from app.database.session import init_db
from app.routes import api_bp
from app.routes.user_routes import user_bp


def create_app() -> Flask:
    """Create and configure the Flask application."""
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
    )

    # Initialize database tables when a DATABASE_URL is configured.
    try:
        init_db()
    except Exception as exc:
        logging.getLogger(__name__).warning("Database initialization skipped: %s", exc)

    app.register_blueprint(api_bp)
    app.register_blueprint(user_bp)

    @app.get("/")
    def root():
        return jsonify(
            {
                "success": True,
                "message": "JanNetra API is running",
                "health": "/api/v1/health",
            }
        )

    return app
