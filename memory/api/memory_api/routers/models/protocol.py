from pydantic import BaseModel


class Model(BaseModel):
    model_name: str
    max_length: int
    updated_at: float | None = None
    default_settings: dict


class ModelRequest(BaseModel):
    model_name: str