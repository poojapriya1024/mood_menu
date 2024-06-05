
let selectedFile = null;

const previewImage = () => {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const file = fileInput.files[0];

    if (file) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

const analyzeImage = async () => {
    if (!selectedFile) {
        alert('Please select an image first!');
        return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
        const response = await fetch('/get_recommendations', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            const {emotion,dish_name,info_list} = result;
            console.log(info_list);

        } else {
            console.error('Error uploading image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

document.getElementById('fileInput').addEventListener('change', previewImage);
document.getElementById('analyzeButton').addEventListener('click', analyzeImage);


// const getRecommendations = async () => {
//     if (!selectedFile) {
//         alert('Please select an image first!');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedFile);

//     try {
//         const response = await fetch('/get_recommendations', {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             const result = await response.json();
//             const {dish_name, info, emotion } = result;


//             console.log(result);
//         } else {
//             console.error('Error uploading image');
//         }
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// }

// // const displayRecommendation = (data) => {
// //     const resultContainer = document.getElementById('result');
// //     resultContainer.innerHTML = `
// //         <div class="container mt-4 mr-5 col">
// //             <h1>${data.dish_name}</h1>
// //             <img class="img-fluid mt-3" src="background.jpg" alt="recommended dish"/>
// //         </div>
// //         <div class="container mt-4 ml-4 col">
// //             <h1 class="mb-4">You are feeling <span style="color:#2f88fc; text-transform: uppercase;">${data.emotion}.</span><br>Here's what you can try.</h1>
// //             <h3>
// //                 <ul>
// //                     ${data.info.map(item => `<li class="mb-3">${item}</li>`).join('')}
// //                 </ul>
// //             </h3>
// //         </div>
// //     `;
// // }

// function renderResultPage(dish_name, info, emotion) {

//     document.getElementById('dishName').innerText = dish_name;
//     document.getElementById('emotion').innerText = emotion;

//     const infoList = document.getElementById('infoList');
//     infoList.innerHTML = '';
//     info.forEach(item => {
//         const listItem = document.createElement('li');
//         listItem.innerText = item;
//         infoList.appendChild(listItem);
//     });

//     // Navigate to the results page
//     window.location.href = '#resultSection';  // Assuming you have a section with id 'resultSection' in get_recommendations.html
// }


// let selectedFile = null;

// const previewImage = () => {
//     const fileInput = document.getElementById('fileInput');
//     const preview = document.getElementById('preview');
//     const file = fileInput.files[0];

//     if (file) {
//         selectedFile = file;
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             preview.src = e.target.result;
//             preview.style.display = 'block';
//         };
//         reader.readAsDataURL(file);
//     }
// }

// const getRecommendations = async () => {
//     if (!selectedFile) {
//         alert('Please select an image first!');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedFile);

//     try {
//         const response = await fetch('/get_recommendations', {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             const result = await response.json();
//             const { dish_name, info, emotion } = result;
//         } else {
//             console.error('Error uploading image');
//         }
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// }

// function renderResultPage(dish_name, info, emotion) {
//     // Ensure these elements exist in the DOM
//     const dishNameElem = document.getElementById('dishName');
//     const emotionElem = document.getElementById('emotion');
//     const infoList = document.getElementById('infoList');

//     if (!dishNameElem || !emotionElem || !infoList) {
//         console.error('One or more elements are not found in the DOM');
//         return;
//     }

//     dishNameElem.innerText = dish_name;
//     emotionElem.innerText = emotion;

//     infoList.innerHTML = '';
//     info.forEach(item => {
//         const listItem = document.createElement('li');
//         listItem.innerText = item;
//         infoList.appendChild(listItem);
//     });

//     // Navigate to the results page
//     window.location.href = '#resultSection';
// }

// // Check if elements exist before adding event listeners
// const fileInputElem = document.getElementById('fileInput');
// const getRecommendationsButtonElem = document.getElementById('getRecommendationsButton');

// if (fileInputElem && getRecommendationsButtonElem) {
//     fileInputElem.addEventListener('change', previewImage);
//     getRecommendationsButtonElem.addEventListener('click', getRecommendations);
// }
