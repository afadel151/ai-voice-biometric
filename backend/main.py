from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from model import load_model
from utils import extract_mfcc
from identify import identify_speaker
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow frontend access (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Speaker Identification API"}

@app.post("/identify/")
async def identify(file: UploadFile = File(...)):
    #save the file as a temporary file
    with open("temp_audio.wav", "wb") as f:
        f.write(await file.read())
    # Load the model and label encoder
    model = load_model()
   
    # Extract MFCC features from the uploaded audio file
    mfcc_features = extract_mfcc("temp_audio.wav", sr=16000, n_mfcc=40, n_frames=100)
    # Identify the speaker using the extracted MFCC features
    speaker = identify_speaker(mfcc_features, model)
    # Check if the speaker is identified or unknown
    if speaker is None or speaker[0] == 'unknown':
        return JSONResponse(content={"speaker": "unknown"}, status_code=404)
    else:
        return JSONResponse(content={"speaker": speaker[0], "probability": speaker[1]}, status_code=200)
@app.on_event("startup")
def log_routes():
    print("Available routes:")
    for route in app.routes:
        print(f"{route.path} - {route.methods}")
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)