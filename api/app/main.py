import os
import shutil

from fastapi import FastAPI, File, UploadFile

from app.detector import analyze_car_image

app = FastAPI()


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    upload_path = f"uploads/{file.filename}"
    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_car_image(upload_path)
    os.remove(upload_path)
    return result
