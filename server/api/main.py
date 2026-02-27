from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from user import UserDetails
import random, string


app = FastAPI(
    title="Password Generator",
    description="A simple API to generate random bassword based on user criteria",
    contact={"name": "Al-khair Pama", "email": "pama.am956@s.msumain.edu.ph"},
)

origins: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "From khair"}


@app.post("/generate-password")
async def generate_password(userDetails: UserDetails):

    if userDetails.length < 8:
        return {"message": "Password length must be at least 8 characters"}
    else:

        name = userDetails.name
        dsa: str = string.ascii_letters
        if userDetails.include_uppercase:
            dsa += string.ascii_uppercase
        if userDetails.include_lowercase:
            dsa += string.ascii_lowercase
        if userDetails.include_numbers:
            dsa += string.digits
        if userDetails.include_special:
            dsa += string.punctuation

        password: str = "".join(random.choices(dsa, k=userDetails.length)) + name
        print(f"password: {password}")
        return {"success": True, "data": {"password": password}}
