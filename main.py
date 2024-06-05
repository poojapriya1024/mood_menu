import os
import warnings

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppress TensorFlow logs
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN custom operations

warnings.filterwarnings('ignore', category=DeprecationWarning, module='tensorflow')


from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask import current_app
import mysql.connector
from PIL import Image
import base64
from deepface import DeepFace
import cv2
from io import BytesIO
import random

app = Flask(__name__)

dish_name = None
info_list = None
emotion = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/use_camera')
def use_camera():
    return render_template('use_camera.html')

@app.route('/browse_images')
def browse_images():
    return render_template('browse_images.html')

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    global dish_name, info_list, emotion
    try:
        if 'image' in request.files:  # File upload
            image = request.files['image']
            image.save("image_to_be_analyzed.jpg")

        elif 'image' in request.json:  # Camera capture
            try:
                image_data = request.json['image']
                image_data = image_data.split(",")[1]
                image = base64.b64decode(image_data)
                with open('image_to_be_analyzed.jpg', 'wb') as f:
                    f.write(image)

            except Exception as e:
                return jsonify({"error": str(e)}), 500
        else:

            return jsonify({"error": "Image not found in request"}), 400

        # Call the function to analyze the image and get the recommendation
        dish_name, info_list, emotion = analyze_and_fetch_recommendation('image_to_be_analyzed.jpg')

        info_list = info_list.split('.')
        return jsonify(
            {
                "emotion" : emotion,
                "dish_name": dish_name,
                "info_list":info_list
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/results')
def render_results():
    global dish_name, info_list, emotion
    cleaned_info_list = [item.strip() for item in info_list if item.strip()]

    if dish_name is None or info_list is None or emotion is None:
        return "Error: Recommendation data not available"

    return render_template('results.html',dish_title=dish_name, info_list=cleaned_info_list, emotion=emotion)



def analyze_and_fetch_recommendation(image_path):
    
    emotion = analyze_emotion(image_path)
    dish_name, info = query_db(emotion)
    return dish_name, info, emotion

def analyze_emotion(image_name):
    img = cv2.imread(image_name)
    result = DeepFace.analyze(img, actions=['emotion'])
    emotions = result[0]['emotion']
    sorted_emotions = sorted(emotions.items(), key=lambda item: item[1], reverse=True)

    if sorted_emotions[0][0] == "neutral":
        if sorted_emotions[0][1] >= 90.0:
            return "neutral"
        else:
            return sorted_emotions[1][0]
    else:
        return sorted_emotions[0][0]

def connect_to_db():
    my_db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root@123",
        port=3306,
        database="my_schema"
    )
    return my_db

def query_db(emotion):
    db = connect_to_db()
    cursor = db.cursor()

    query = "SELECT dish_name, information FROM food_recommendations WHERE emotion = %s"
    
    cursor.execute(query, (emotion,))
    dishes = cursor.fetchall()
    cursor.close()
    db.close()

    selected_dish = random.choice(dishes)
    return selected_dish

if __name__ == '__main__':
    app.run(debug=True)
