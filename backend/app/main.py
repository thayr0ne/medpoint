from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes import auth, prescriptions, prescription_models

app = FastAPI(title="MediPoint Central API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(prescriptions.router, prefix="/api/prescriptions", tags=["prescriptions"])
app.include_router(prescription_models.router, prefix="/api/prescription-models", tags=["prescription-models"])


@app.get("/api/health", tags=["health"])
async def health_check() -> dict[str, str]:
    """Verifica se a API está acessível."""
    return {"status": "ok"}
