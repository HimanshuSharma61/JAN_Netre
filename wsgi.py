"""
WSGI entrypoint for JanNetra Flask application.
"""
import os
from dotenv import load_dotenv

load_dotenv()

from app import create_app  # noqa: E402

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", "8000"))
    app.run(host="0.0.0.0", port=port)
