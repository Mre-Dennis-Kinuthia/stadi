const imageInputCard = document.querySelector('.image-input-card');
const imageCard = document.getElementById('image-card'); // Target the image-card div

imageInputCard.addEventListener('dragover', (e) => {
  e.preventDefault();
});

imageInputCard.addEventListener('drop', (e) => {
  e.preventDefault();
  
  const imageFile = e.dataTransfer.files[0];

  if (imageFile) {
    // Do something with the dropped image file, e.g., display it in image-card.
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(imageFile);
    imageCard.appendChild(imageElement); // Append to image-card div
  }
});
