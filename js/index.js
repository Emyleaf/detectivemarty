// Variabili di stato per alternare immagini
let currentImage = 1;

function toggleImages() {
    const image1 = document.getElementById('hellomama-image');
    const image2 = document.getElementById('hellomama-image2');
    
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

// Gestione click sul pulsante CASI
document.getElementById('casi-button').addEventListener('click', function(e) {
    e.preventDefault();
    const casiButton = document.getElementById('casi-button');
    const dossierButton = document.getElementById('dossier-button');
    const caso1Button = document.getElementById('caso1-button');
    
    // Applica animazione slide-out-left ai primi due pulsanti
    casiButton.classList.add('slide-out-left');
    dossierButton.classList.add('slide-out-left');
    
    // Nascondi effettivamente i pulsanti dopo l'animazione
    setTimeout(function() {
        casiButton.style.display = 'none';
        dossierButton.style.display = 'none';
    }, 300);
    
    // Mostra il terzo pulsante e applica animazione slide-in-right dopo 1 secondo
    setTimeout(function() {
        caso1Button.classList.remove('hidden');
        caso1Button.classList.add('slide-in-right');
    }, 300);
});

// Gestione click sul pulsante CASO1 con transizione
document.getElementById('caso1-button').addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector('.section');
    const href = this.getAttribute('href');
    
    // Applica l'animazione di uscita
    section.classList.add('transition-out');
    
    // Naviga alla pagina dopo che l'animazione finisce
    setTimeout(function() {
        window.location.href = href;
    }, 800);
});
