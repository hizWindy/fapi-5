from pydantic import BaseModel, Field


class UserDetails(BaseModel):
    name : str
    length: int = Field(8, ge=6, le=64)
    include_uppercase : bool = False
    include_lowercase : bool = False
    include_numbers : bool = False
    include_special : bool = False
    

