// Funzione per alternare tra le immagini
let currentImage = 0; // Inizia con la prima immagine

function toggleImages() {
    const image1 = document.getElementById('hellomama-image');
    const image2 = document.getElementById('hellomama-image2');
    2
    if (currentImage === 1) {
        image1.style.display = 'none';
        image2.style.display = 'block';
        currentImage = 2;
    } else {
        image1.style.display = 'block';
        image2.style.display = 'none';
        currentImage = 1;
    }
}

// Chiama la funzione per alternare le immagini ogni tot secondi (ad esempio, ogni 5 secondi)
//setInterval(toggleImages, 400);
