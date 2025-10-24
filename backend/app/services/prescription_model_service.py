from datetime import datetime
from typing import List

from ..schemas.prescription import PrescriptionModelCreate, PrescriptionModelRead

MODELS: list[PrescriptionModelRead] = []


async def create(payload: PrescriptionModelCreate, user) -> PrescriptionModelRead:
    record = PrescriptionModelRead(
        id=str(len(MODELS) + 1),
        created_at=datetime.utcnow(),
        created_by=user.id,
        created_by_name=user.name,
        uses=0,
        **payload.model_dump(),
    )
    MODELS.insert(0, record)
    return record


async def list_public() -> List[PrescriptionModelRead]:
    return [model for model in MODELS if model.is_public]


async def list_by_user(user_id: str) -> List[PrescriptionModelRead]:
    return [model for model in MODELS if model.created_by == user_id]
