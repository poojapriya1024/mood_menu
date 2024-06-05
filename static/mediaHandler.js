let video = document.getElementById('camera');
let canvas = document.createElement('canvas');
let snapshot = document.getElementById('snapshot');
let captureButton = document.getElementById('captureButton');
let capturedImage = '';

const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
                    video.srcObject = stream;
                    video.play();
                    video.classList.add('img-thumbnail');
                    captureButton.classList.remove('d-none');

                })
        .catch(err => {
                    console.error("Error accessing the camera: ", err);
                });
}

const takeSnapshot = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        capturedImage = canvas.toDataURL('image/png');
        snapshot.src = capturedImage;
        snapshot.classList.remove('d-none');
        video.classList.add('d-none');

}

const analyzeImage = async () => {

    try {
        const response = await fetch('/get_recommendations', {
            method: 'POST',
            body: JSON.stringify({image: capturedImage}),
            headers: {
                'Content-Type':'application/json'
            }
        });

        if(response.ok) {
            const result = await response.json();
            const {emotion,dish_name,info_list} = result;
            console.log(info_list);
            
        } else {
            console.log("Error uploading image");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}

document.getElementById('analyzeButton').addEventListener('click', analyzeImage);
