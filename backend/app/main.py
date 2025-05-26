from fastapi import FastAPI, File, UploadFile, Form
from app.model import get_embedding
from app.identify import identify_speaker
from app.database import insert_embedding

app = FastAPI()

@app.post("/identify/")
async def identify(file: UploadFile = File(...)):
    with open("temp.flac", "wb") as f:
        f.write(await file.read())

    Name = get_embedding("temp.flac")
    # speaker, similarity = identify_speaker(embedding)

    return {"speaker": Name}

@app.post("/add/")
async def add_speaker(
    file: UploadFile = File(...),
    speaker: str = Form(...)
):
    with open("temp.flac", "wb") as f:
        f.write(await file.read())

    embedding = get_embedding("temp.flac")
    insert_embedding(speaker, embedding)

    return {"message": f"Added speaker {speaker}"}
