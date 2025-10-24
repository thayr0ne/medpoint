from typing import List

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ...schemas.prescription import PrescriptionCreate, PrescriptionRead
from ...services import auth_service, prescription_service

router = APIRouter()


@router.post("", response_model=PrescriptionRead)
async def create_prescription(
    payload: PrescriptionCreate,
    user=Depends(auth_service.get_current_user),
) -> PrescriptionRead:
    return await prescription_service.create(payload, user)


@router.get("/{prescription_id}", response_model=PrescriptionRead)
async def get_prescription(prescription_id: str) -> PrescriptionRead:
    prescription = await prescription_service.get_by_id(prescription_id)
    if not prescription:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prescrição não encontrada")
    return prescription


@router.get("", response_model=List[PrescriptionRead])
async def list_prescriptions(limit: int = 10) -> List[PrescriptionRead]:
    return await prescription_service.list_recent(limit)
