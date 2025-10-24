from typing import List

from typing import List

from fastapi import APIRouter, Depends

from ...schemas.prescription import PrescriptionModelCreate, PrescriptionModelRead
from ...services import auth_service, prescription_model_service

router = APIRouter()


@router.post("", response_model=PrescriptionModelRead)
async def create_model(
    payload: PrescriptionModelCreate,
    user=Depends(auth_service.get_current_user),
) -> PrescriptionModelRead:
    return await prescription_model_service.create(payload, user)


@router.get("/public", response_model=List[PrescriptionModelRead])
async def list_public_models() -> List[PrescriptionModelRead]:
    return await prescription_model_service.list_public()


@router.get("/user/{user_id}", response_model=List[PrescriptionModelRead])
async def list_user_models(user_id: str) -> List[PrescriptionModelRead]:
    return await prescription_model_service.list_by_user(user_id)
