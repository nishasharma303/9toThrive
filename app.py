"""Top-level ASGI app shim.

This file re-exports the FastAPI `app` instance from `backend.app` so you can
run `uvicorn app:app` from the project root (the command you ran).

If you prefer, you can also run `uvicorn backend.app:app` directly.
"""
from backend.app import app  # re-export FastAPI instance
