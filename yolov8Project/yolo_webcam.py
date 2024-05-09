from flask import Flask
import cv2
from ultralytics import YOLO

app = Flask(__name__)

# Charger le modèle YOLO
model = YOLO("../yolov8Project/Yolo-Weights/yolov8l.pt")

classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "chair",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "pen", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "table", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"
              ]

@app.route('/detection', methods=['GET'])
def perform_detection():
    cap = cv2.VideoCapture(0)
    success, img = cap.read()
    results = model(img, stream=True)
    has_person = False
    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls = int(box.cls[0])
            if classNames[cls] == "person":
                has_person = True
                break

    cap.release()  # Libérer la capture de la webcam
    if has_person:
        return 'oui'
    else:
        return 'non'

if __name__ == '__main__':
    app.run(host='localhost', port=9999)
