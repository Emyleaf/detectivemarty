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

// Variabili di stato per tracciare i click
let clickCount = 0;
let typewriterFinished = false;
let currentTimeoutId = null;

// Funzione per effetto macchina da scrivere con callback per ogni carattere
function typewriter(element, text, speed = 30, onComplete = null, onCharacter = null) {
    let index = 0;
    element.innerHTML = '';
    typewriterFinished = false;
    
    function type() {
        if (index < text.length) {
            const char = text[index];
            
            // Callback per ogni carattere
            if (onCharacter) {
                onCharacter(char, index);
            }
            
            // Se il carattere è un punto, aggiungi una pausa di 1 secondo e 2 newline
            // Ma NON se fa parte di ellissi (almeno 2 punti consecutivi)
            if ((char === '.' || char === '!' || char === '?') && char !== '…') {
                // Controlla se è parte di ellissi (due o più punti consecutivi)
                const isEllipsis = (index > 0 && text[index - 1] === '.') || 
                                   (index < text.length - 1 && text[index + 1] === '.') ||
                                   (index < text.length - 1 && text[index + 1] === '…');
                
                if (!isEllipsis) {
                    element.innerHTML += char + '<br><br>';
                    currentTimeoutId = setTimeout(type, 1000);
                } else {
                    element.innerHTML += char;
                    currentTimeoutId = setTimeout(type, speed);
                }
            } else {
                element.innerHTML += char;
                currentTimeoutId = setTimeout(type, speed);
            }
            
            index++;
        } else {
            typewriterFinished = true;
            if (onComplete) {
                onComplete();
            }
        }
    }
    
    type();
}

// Inizializza l'effetto typewriter al caricamento della pagina
window.addEventListener('load', function() {
    const storyElement = document.getElementById('story-text');
    if (storyElement) {
        const storyText = 'Marty, aspirante detective, è diventata da poche settimane tirocinante dell\'Agente Gallo, un noto investigatore di fama internazionale. Gallo è stato invitato alla Villa Neoclassica "La Rotonda", un antico edificio per un\'asta di opere d\'arte fra milionari. Dato l\'interesse di Marty per l\'arte, Gallo decide di portare con sé la sua allieva… sperando vada tutto per il meglio!';
        typewriter(storyElement, storyText, 30, function() {
            // Quando il typewriter finisce, incrementa il counter a 1
            if (clickCount === 0) {
                clickCount = 1;
            }
        });
    }
    
    // Aggiungi event listener alla sezione per i click
    const section = document.querySelector('.section');
    
    if (section) {
        section.addEventListener('click', function(e) {
            // Previeni click multipli dopo il secondo
            if (clickCount >= 2) return;
            
            clickCount++;
            
            if (clickCount === 1) {
                // Primo click: carica il testo subito (ferma il typewriter)
                clearTimeout(currentTimeoutId);
                typewriterFinished = true;
                const storyElement = document.getElementById('story-text');
                const storyText = 'Marty, aspirante detective, è diventata da poche settimane tirocinante dell\'Agente Gallo, un noto investigatore di fama internazionale. Gallo è stato invitato alla Villa Neoclassica "La Rotonda", un antico edificio per un\'asta di opere d\'arte fra milionari. Dato l\'interesse di Marty per l\'arte, Gallo decide di portare con sé la sua allieva… sperando vada tutto per il meglio!';
                storyElement.innerHTML = storyText.replace(/\n/g, '<br>').replace(/\./g, '.<br><br>').replace(/!/g, '!<br><br>').replace(/\?/g, '?<br><br>');
            } else if (clickCount === 2) {
                // Secondo click: nascondi il primo container e mostra la card
                const storyContainer = document.getElementById('story-container');
                const storyCard = document.querySelector('.story-card');
                
                // Applica l'animazione di fade out
                storyContainer.classList.add('transition-out');
                
                // Aggiungi hidden dopo che l'animazione finisce (800ms)
                setTimeout(function() {
                    storyContainer.classList.add('hidden');
                }, 800);
                
                // Aggiungi l'animazione zoom-in-out-box-retarded
                storyCard.classList.add('zoom-in-out-box-retarded');
                
                // Rimuovi hidden dopo 0.3s (quando l'animazione sta per partire)
                setTimeout(function() {
                    storyCard.classList.remove('hidden');
                }, 300);
            }
        });
    }
    
    // Event listener per il pulsante LET'S GO!
    const letGoButton = document.querySelector('.card-footer .button');
    if (letGoButton) {
        letGoButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const storyCard = document.querySelector('.story-card');
            const characterSection = document.querySelector('.character-section');
            
            // Nascondi la card con transition-out
            storyCard.classList.add('transition-out');
            
            // Aggiungi hidden dopo che l'animazione finisce (800ms)
            setTimeout(function() {
                storyCard.classList.add('hidden');
            }, 800);
            
            // Mostra il character-section
            characterSection.classList.remove('hidden');
            characterSection.classList.add('fade-in');
            
            // Inizia l'alternanza delle immagini
            setInterval(toggleImages, 400);
            
            // Mostra l'elemento 64 dopo 2 secondi con fade in
            setTimeout(function() {
                const element64 = document.getElementById('64');
                if (element64) {
                    element64.classList.remove('hidden');
                    element64.classList.add('fade-in');

                    // Dopo 3 secondi, fade-out entrambi all'unisono
                    setTimeout(function() {
                        element64.classList.remove('fade-in');
                        characterSection.classList.remove('fade-in');
                        
                        element64.classList.add('transition-out');
                        characterSection.classList.add('transition-out');

                        // Nascondi dopo che l'animazione finisce (800ms)
                        setTimeout(function() {
                            element64.classList.add('hidden');
                            characterSection.classList.add('hidden');
                            
                            // Mostra il story-card2
                            const storyCard2 = document.querySelector('.story-card2');
                            if (storyCard2) {
                                storyCard2.classList.remove('hidden');
                                storyCard2.classList.add('zoom-in-out-box-retarded');
                                
                                // Attiva il typewriter per il testo di Gallo
                                const galloText2 = document.getElementById('gallo-text-2');
                                if (galloText2) {
                                    const text = 'Yawn, mi sto addormentando… aspettare qua fuori è palloso, però è quasi finita, menomale che è andato tutto per il megl…';
                                    typewriter(galloText2, text, 40, null, function(char, index) {
                                        // Quando si raggiunge la "g" finale, fade-out del story-card2
                                        if (char === '…' && index === text.length - 1) {
                                            clearTimeout(currentTimeoutId);
                                            storyCard2.classList.add('transition-out');
                                            setTimeout(function() {
                                                storyCard2.classList.add('hidden');
                                                storyCard2.classList.remove('zoom-in-out-box');
                                                
                                                // Mostra il baloon
                                                const baloon = document.querySelector('.baloon');
                                                const flashOverlay = document.querySelector('.flash-overlay');
                                                if (baloon) {
                                                    baloon.classList.remove('hidden');
                                                    baloon.classList.add('turbulent-flash');
                                                    // Attiva il flash overlay
                                                    if (flashOverlay) {
                                                        flashOverlay.classList.add('active');
                                                        setTimeout(function() {
                                                            flashOverlay.classList.remove('active');
                                                        }, 600);
                                                    }
                                                    
                                                    // Dopo 4 secondi, fade-out del baloon
                                                    setTimeout(function() {
                                                        baloon.classList.remove('turbulent-flash');
                                                        baloon.classList.add('fade-out-slow');
                                                        
                                                        // Mostra e fade-in del foto1-container
                                                        setTimeout(function() {
                                                            baloon.classList.add('hidden');
                                                            baloon.classList.remove('fade-out-slow');
                                                            
                                                            const foto1Container = document.getElementById('foto1-container');
                                                            if (foto1Container) {
                                                                foto1Container.classList.remove('hidden');
                                                                foto1Container.classList.add('fade-in-slow');
                                                                
                                                                // Dopo 4 secondi, fade-out della polaroid e mostra contenuto finale
                                                                setTimeout(function() {
                                                                    foto1Container.classList.remove('fade-in-slow');
                                                                    foto1Container.classList.add('fade-out-slow');
                                                                    
                                                                    setTimeout(function() {
                                                                        foto1Container.classList.add('hidden');
                                                                        
                                                                        const finalContent = document.getElementById('final-content');
                                                                        if (finalContent) {
                                                                            finalContent.classList.remove('hidden');
                                                                            
                                                                            // Anima il logo prima
                                                                            const logoFigure = document.getElementById('logo-figure');
                                                                            if (logoFigure) {
                                                                                // Il logo ha già la classe 'logo' con animazione logo-pulse 1.5s
                                                                                
                                                                                // Dopo 1.5s (fine animazione logo), mostra "in"
                                                                                setTimeout(function() {
                                                                                    const inText = document.getElementById('in-text');
                                                                                    if (inText) {
                                                                                        inText.classList.remove('hidden');
                                                                                        // L'elemento ha già la classe 'logo' con animazione logo-pulse 1.5s
                                                                                        
                                                                                        // Dopo 1.5s (fine animazione "in"), mostra caso1 image
                                                                                        setTimeout(function() {
                                                                                            const caso1Image = document.getElementById('caso1-image');
                                                                                            if (caso1Image) {
                                                                                                caso1Image.classList.remove('hidden');
                                                                                                // L'elemento ha già la classe 'logo' con animazione logo-pulse 1.5s
                                                                                                
                                                                                                // Dopo 1.5s (fine ultima animazione), abilita il click
                                                                                                setTimeout(function() {
                                                                                                    let clickEnabled = true;
                                                                                                    const section = document.querySelector('.section');
                                                                                                    
                                                                                                    section.addEventListener('click', function handleFinalClick() {
                                                                                                        if (!clickEnabled) return;
                                                                                                        clickEnabled = false;
                                                                                                        
                                                                                                        // Fade-out di tutta la sezione
                                                                                                        section.classList.add('transition-out');
                                                                                                        
                                                                                                        // Reindirizza dopo il fade-out (800ms)
                                                                                                        setTimeout(function() {
                                                                                                            window.location.href = 'caso1_game.html';
                                                                                                        }, 800);
                                                                                                    });
                                                                                                }, 1500);
                                                                                            }
                                                                                        }, 1500);
                                                                                    }
                                                                                }, 1500);
                                                                            }
                                                                        }
                                                                    }, 4000);
                                                                }, 4000);
                                                            }
                                                        }, 4000);
                                                    }, 1200);
                                                }
                                            }, 800);
                                        }
                                    });
                                }
                            }
                        }, 800);
                    }, 3000);
                }
            }, 2000);
        });
    }
});
