// Variabili di stato per alternare immagini
let currentImage = 1;

// Logica per la musica
const ostAudio = document.getElementById('ost-audio');
const musicToggleButton = document.getElementById('music-toggle');
const OST_BASE_VOLUME = 0.3;
let userPausedMusic = false;
let ostFadeInterval = null;

function setMusicToggleState(isPlaying) {
    if (!musicToggleButton) return;
    const musicToggleImage = document.getElementById('music-toggle-image');
    if (musicToggleImage) {
        musicToggleImage.src = isPlaying ? './img/song.png' : './img/mute.png';
    }
    musicToggleButton.setAttribute('aria-label', isPlaying ? 'Disattiva musica' : 'Riattiva musica');
}

function clearOstFade() {
    if (ostFadeInterval) {
        clearInterval(ostFadeInterval);
        ostFadeInterval = null;
    }
}

function fadeOst(targetVolume, duration, onComplete) {
    if (!ostAudio) return;
    clearOstFade();
    const startVolume = ostAudio.volume;
    const volumeDiff = targetVolume - startVolume;
    if (Math.abs(volumeDiff) < 0.001) {
        ostAudio.volume = targetVolume;
        if (onComplete) onComplete();
        return;
    }
    const steps = 20;
    const stepTime = duration / steps;
    let currentStep = 0;
    ostFadeInterval = setInterval(() => {
        currentStep += 1;
        const progress = currentStep / steps;
        ostAudio.volume = startVolume + volumeDiff * progress;
        if (currentStep >= steps) {
            clearOstFade();
            ostAudio.volume = targetVolume;
            if (onComplete) onComplete();
        }
    }, stepTime);
}

// Avvia la musica
if (ostAudio) {
    ostAudio.loop = true;
    ostAudio.volume = OST_BASE_VOLUME;
    const playPromise = ostAudio.play();
    if (playPromise) {
        playPromise.then(() => setMusicToggleState(true)).catch(() => setMusicToggleState(false));
    } else {
        setMusicToggleState(!ostAudio.paused);
    }
} else {
    setMusicToggleState(false);
}

// Toggle della musica
if (musicToggleButton && ostAudio) {
    setMusicToggleState(!ostAudio.paused);
    musicToggleButton.addEventListener('click', function() {
        clearOstFade();
        if (ostAudio.paused) {
            userPausedMusic = false;
            ostAudio.volume = OST_BASE_VOLUME;
            ostAudio.play().then(() => setMusicToggleState(true)).catch(() => setMusicToggleState(false));
        } else {
            userPausedMusic = true;
            ostAudio.pause();
            setMusicToggleState(false);
        }
    });
}

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
