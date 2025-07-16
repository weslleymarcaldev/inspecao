import easyocr
from ultralytics import YOLO

reader = easyocr.Reader(["en"])
model = YOLO("yolov8n.pt")


def analyze_car_image(image_path):
    detections = model(image_path)[0]
    labels = [model.names[int(cls)] for cls in detections.boxes.cls]

    result = reader.readtext(image_path, detail=0)

    return {
        "plate": result[0] if result else None,
        "objects_detected": labels,
        "angle_estimation": estimate_angle(labels),
        "damage_detected": "damage" in labels,
    }


def estimate_angle(labels):
    if "front" in labels:
        return "frontal"
    if "side" in labels:
        return "lateral"
    return "desconhecido"
