# MoodMenu

MoodMenu is a web application that recommends dishes based on the user's current emotion detected from their facial expressions. This project leverages deep learning models for emotion recognition and connects to a database to provide personalized food recommendations. It helps in improving the user's emotional well-being. 

## Features

- **Emotion Detection:** Analyze user's facial expressions to detect emotions.
- **Personalized Recommendations:** Recommend dishes based on detected emotions.
- **Image Upload and Camera Capture:** Users can upload images or use the camera.
- **Detailed Dish Information:** Display detailed information about the recommended dish.

## Tech Stack

- **Front-end:** HTML, JavaScript, Bootstrap CSS 
- **Back-end:** Flask, Python
- **Database:** MySQL
- **Deep Learning:** TensorFlow, Keras, DeepFace
- **Other Libraries:** base64, random

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/poojapriya1024/mood_menu.git
    cd mood_menu
    ```

2. **Set up the virtual environment:**
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install the required dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Set up the database:**
    - Ensure you have MySQL installed and running.
    - Create a database named `my_schema`.
    - Import the schema provided in `my_schema.sql`.

5. **Configure database connection:**
    - Update the `connect_to_db` function in `main.py` with your MySQL credentials.

6. **Run the application:**
    ```sh
    flask run
    ```

## Usage

1. **Access the application:**
    - Open your browser and navigate to `http://127.0.0.1:5000`.

2. **Use the camera or upload an image:**
    - Navigate to "Use Camera" to capture an image.
    - Navigate to "Browse Images" to upload an image from your gallery.

3. **Get recommendations:**
    - Click on "Analyze Image" to detect emotions.
    - Click on "Get Recommendations" to view the recommended dish.

Check out the demo here: [![Watch MoodMenu Demo](https://img.shields.io/badge/▶️%20Watch%20Demo%20Video-blue?style=for-the-badge)](https://drive.google.com/file/d/1AiJSW2MQ7MPA_mFOCLTXZULD6oSipu12/view?usp=sharing)

