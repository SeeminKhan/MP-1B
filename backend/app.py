from flask import Flask, request, jsonify, render_template, Response
from flask_cors import CORS
from flask_mysqldb import MySQL
import cv2
import numpy as np
from keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'  # Your MySQL host
app.config['MYSQL_USER'] = 'root'       # Your MySQL username
app.config['MYSQL_PASSWORD'] = 'smySql#abc'  # Your MySQL password
app.config['MYSQL_DB'] = 'back'        # Your MySQL database name

# Initialize MySQL
mysql = MySQL(app)

# Load models and classifiers
ageProto = "age_deploy.prototxt"
ageModel = "age_net.caffemodel"
genderProto = "gender_deploy.prototxt"
genderModel = "gender_net.caffemodel"

ageNet = cv2.dnn.readNet(ageModel, ageProto)
genderNet = cv2.dnn.readNet(genderModel, genderProto)
ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
genderList = ['Male', 'Female']
MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)

# Load the pre-trained models for mask detection and emotion detection
mask_model = load_model('mask_detection_best1.h5')
emotion_model = load_model('model_inception2.hdf5')

# Load the face cascade classifier
faceCascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Define class labels for emotion detection
class_labels_emotion = ['Happy', 'Angry', 'Fear', 'Neutral']

# Text constants for mask detection
text_mask_on = "Mask On"
text_mask_off = "Mask Off"
font = cv2.FONT_HERSHEY_SIMPLEX
scale = 0.8

@app.route('/product')

def generate_frames():
    # Open video capture device
    video = cv2.VideoCapture(0)

    while True:
        ret, frame = video.read()
        if not ret:
            break

        # Process the frame (detect faces, emotions, age, gender)
        frame = detect_faces(frame)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    video.release()
    cv2.destroyAllWindows()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

def predict_mask(face):
    face_frame = cv2.resize(face, (224, 224))
    face_frame = img_to_array(face_frame)
    face_frame = np.expand_dims(face_frame, axis=0)
    face_frame = preprocess_input(face_frame)
    prediction = mask_model.predict(face_frame)
    return prediction[0][0]

def detect_faces(frame):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray_frame, 1.1, 5)

    for (x, y, w, h) in faces:
        roi_color = frame[y:y + h, x:x + w]
        mask_prediction = predict_mask(roi_color)

        # Predict emotion only if mask is off
        if mask_prediction <= 0.5:
            # Predict emotion
            face_img = cv2.cvtColor(roi_color, cv2.COLOR_BGR2RGB)
            face_img = cv2.resize(face_img, (48, 48))
            face_img = img_to_array(face_img)
            face_img = np.expand_dims(face_img, axis=0) / 255.0
            emotion_prediction = emotion_model.predict(face_img)
            label_emotion = np.argmax(emotion_prediction, axis=1)[0]
            emotion_result = class_labels_emotion[label_emotion]
        else:
            # No emotion result when mask is on
            emotion_result = "No Emotion Results"

        # Age and Gender detection
        faceROI = frame[y:y + h, x:x + w]
        blob = cv2.dnn.blobFromImage(faceROI, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)

        # Gender detection
        genderNet.setInput(blob)
        genderPred = genderNet.forward()
        gender = genderList[genderPred[0].argmax()]

        # Age detection
        ageNet.setInput(blob)
        agePred = ageNet.forward()
        age = ageList[agePred[0].argmax()]

        label = f"{gender}, {age}"

        # Display emotion prediction above the bounding box
        cv2.putText(frame, f"Emotion: {emotion_result}", (x, y - 30), font, scale, (0, 255, 255), 2)

        # Draw bounding box based on mask prediction
        if mask_prediction > 0.5:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, text_mask_on, (x + 50, y + h + 30), font, scale, (0, 255, 0), 2)
        else:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv2.putText(frame, text_mask_off, (x + 50, y + h + 30), font, scale, (0, 0, 255), 2)

        # Display age and gender below the bounding box
        cv2.putText(frame, label, (x, y + h + 60), font, scale, (50, 255, 255), 2)

    return frame

@app.route('/signup', methods=['POST'])
def signup():
    # Get data from request body
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Execute MySQL query to insert user into database
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    mysql.connection.commit()
    cur.close()

    # Send a JSON response indicating successful signup
    return jsonify({"message": "Signup successful"})

@app.route('/login', methods=['POST'])
def login():
    # Get data from request body
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Execute MySQL query to check if user exists and password is correct
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()

    if user:
        # Return a JSON response indicating successful login
        return jsonify({"message": "Login successful"})
    else:
        # Return a JSON response indicating unsuccessful login
        return jsonify({"error": "Invalid email or password"}), 401
    
    
@app.route('/contact', methods=['POST'])
def contact():
    # Get data from request body
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Execute MySQL query to insert contact message into database
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO messages (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
    mysql.connection.commit()
    cur.close()

    # Send a JSON response indicating successful message submission
    return jsonify({"message": "Message submitted successfully"})


if __name__ == '__main__':
    app.run(debug=True)


