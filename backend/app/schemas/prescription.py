from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field
from pydantic.alias_generators import to_camel
from pydantic.config import ConfigDict

CategoryLiteral = Literal[
    "medication",
    "antimicrobial",
    "vasoactive",
    "sedation",
    "hydration",
    "diet",
    "care",
]


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class PrescriptionItemBase(CamelModel):
    id: str
    category: CategoryLiteral
    medication: str
    route: str | None = None
    notes: str | None = None


class MedicationItem(PrescriptionItemBase):
    category: Literal["medication"]
    dose: str
    frequency: str
    duration: str | None = None


class AntimicrobialItem(PrescriptionItemBase):
    category: Literal["antimicrobial"]
    dose: str
    frequency: str
    duration: str
    infection_site: str | None = None
    justification: str | None = None
    diluent: str | None = None
    diluent_volume: str | None = None
    start_date: datetime


class VasoactiveItem(PrescriptionItemBase):
    category: Literal["vasoactive", "sedation"]
    dose: str
    dose_unit: str
    patient_weight: float
    solution: str
    solution_volume: float
    infusion_rate: float
    concentration: float | None = None


class HydrationItem(PrescriptionItemBase):
    category: Literal["hydration"]
    solution: str
    volume: float
    infusion_rate: float
    additives: str | None = None
    start_time: str | None = None


class DietItem(PrescriptionItemBase):
    category: Literal["diet"]
    diet_type: str
    diet_details: str
    volume: str | None = None
    frequency: str | None = None


class CareItem(PrescriptionItemBase):
    category: Literal["care"]
    care_type: str
    instructions: str
    frequency: str | None = None


PrescriptionItem = MedicationItem | AntimicrobialItem | VasoactiveItem | HydrationItem | DietItem | CareItem


class PrescriptionBase(CamelModel):
    patient_id: str
    patient_name: str
    record_number: str
    date: datetime
    prescriber_id: str
    prescriber_name: str
    prescriber_crm: str
    diagnosis: str | None = None
    cids: list[str] | None = Field(default_factory=list)


class PrescriptionCreate(PrescriptionBase):
    items: list[PrescriptionItem]


class PrescriptionRead(PrescriptionBase):
    id: str
    items: list[PrescriptionItem]
    created_at: datetime
    updated_at: datetime


class PrescriptionModelCreate(CamelModel):
    name: str
    description: str | None = None
    cids: list[str]
    is_public: bool = False
    category: str | None = None
    items: list[PrescriptionItem]


class PrescriptionModelRead(PrescriptionModelCreate):
    id: str
    created_at: datetime
    created_by: str
    created_by_name: str
    uses: int
