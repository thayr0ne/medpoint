from datetime import datetime
from typing import List

from ..schemas.prescription import PrescriptionCreate, PrescriptionRead

# Armazenamento em memória apenas para scaffolding
PRESCRIPTIONS: list[PrescriptionRead] = []


async def create(payload: PrescriptionCreate, user) -> PrescriptionRead:
    record = PrescriptionRead(
        id=str(len(PRESCRIPTIONS) + 1),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        **payload.model_dump(),
    )
    PRESCRIPTIONS.insert(0, record)
    return record


async def get_by_id(prescription_id: str) -> PrescriptionRead | None:
    return next((item for item in PRESCRIPTIONS if item.id == prescription_id), None)


async def list_recent(limit: int = 10) -> List[PrescriptionRead]:
    return PRESCRIPTIONS[:limit]
