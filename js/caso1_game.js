window.addEventListener('load', function() {
    // Sequenza di immagini e indice corrente
    const imageSequence = ['./img/mmm.png', './img/sad.png', './img/mmm.png', './img/yeah.png'];
    let currentImageIndex = 0;

    // Funzione per cambiare immagine in sequenza
    function changeImageInSequence() {
        const hellomamaImage = document.getElementById('hellomama-image');
        if (hellomamaImage) {
            hellomamaImage.src = imageSequence[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % imageSequence.length;
        }
    }

    // Cambia immagine al caricamento
    changeImageInSequence();

    // Cambia immagine ogni 10 secondi
    setInterval(changeImageInSequence, 5000);

    const ostAudio = document.getElementById('ost-audio');
    const musicToggleButton = document.getElementById('music-toggle');
    const OST_BASE_VOLUME = 0.3;
    const ENDING_BASE_VOLUME = 0.2;
    let endingAudio = null;
    let userPausedMusic = false;
    let ostFadeInterval = null;
    let ostWasPlayingBeforeInterruption = false;
    let interruptionCount = 0;

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

    function fadeAudioGeneric(audioEl, targetVolume, duration, onComplete) {
        if (!audioEl) return;
        const startVolume = audioEl.volume;
        const diff = targetVolume - startVolume;
        if (Math.abs(diff) < 0.001) {
            audioEl.volume = targetVolume;
            if (onComplete) onComplete();
            return;
        }
        const steps = 20;
        const stepTime = duration / steps;
        let currentStep = 0;
        const intervalId = setInterval(() => {
            currentStep += 1;
            const progress = currentStep / steps;
            audioEl.volume = startVolume + diff * progress;
            if (currentStep >= steps) {
                clearInterval(intervalId);
                audioEl.volume = targetVolume;
                if (onComplete) onComplete();
            }
        }, stepTime);
    }

    function playEndingMusicTransition() {
        if (endingAudio) return; // already transitioned
        pauseOstWithFade(() => {
            try {
                endingAudio = new Audio('./audio/ending.mp3');
                endingAudio.volume = 0;
                endingAudio.loop = false;
                const p = endingAudio.play();
                if (p && typeof p.then === 'function') {
                    p.then(() => {
                        fadeAudioGeneric(endingAudio, ENDING_BASE_VOLUME, 600, null);
                    }).catch(() => {/* ignore */});
                } else {
                    fadeAudioGeneric(endingAudio, ENDING_BASE_VOLUME, 600, null);
                }
            } catch (e) {
                // noop
            }
        });
    }

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

    function pauseOstWithFade(onComplete) {
        if (!ostAudio || ostAudio.paused) {
            if (onComplete) onComplete();
            return;
        }
        fadeOst(0, 400, function() {
            ostAudio.pause();
            if (onComplete) onComplete();
        });
    }

    function resumeOstWithFade() {
        if (!ostAudio || userPausedMusic) return;
        ostAudio.volume = 0;
        ostAudio.play().then(() => {
            fadeOst(OST_BASE_VOLUME, 500, null);
            setMusicToggleState(true);
        }).catch(() => setMusicToggleState(false));
    }

    const sospettatiButton = document.getElementById('sospettati_button');
    const incriminaButton = document.getElementById('incrimina_button');
    const galloButton = document.getElementById('gallo_button');
    const backButton = document.getElementById('back-button');
    const backButtonContainer = document.getElementById('back-button-container');
    const incriminaContainerEl = document.getElementById('incrimina-container');
    const incriminaActions = document.getElementById('incrimina-actions');
    const confirmIncriminaButton = document.getElementById('confirm-incrimina');
    
    // Gallo Button functionality
    const galloModal = document.getElementById('gallo-modal');
    const galloModalBackground = document.getElementById('gallo-modal-background');
    const galloOption1 = document.getElementById('gallo-option-1');
    const galloOption2 = document.getElementById('gallo-option-2');
    const galloOption3 = document.getElementById('gallo-option-3');
    const galloOption4 = document.getElementById('gallo-option-4');

    // Array di frasi per ogni opzione
    const smallTalkPhrases = [
        "Ehi Marty, oggi è una bella giornata no? Anche se... c'è un omicidio da risolvere.",
        "Tutto bene? Io sto benissimo, grazie per averlo chiesto! Penso che andrò in spiaggia domani.",
        "Sai, a volte penso che questo lavoro sia troppo per me... ma poi mi ricordo che sono bravo!",
        "Sei sazia? Io ho una fame... volevano tutti parlare con me che alla fine non ho mangiato nulla!",
        "Mi piace lavorare con te, Marty. Sei davvero in gamba!",
        "Sai, ho sentito che il buffet qui è famoso in tutta la città, per questo ho pensato a te!",
        "Sembra un caso molto difficile, qui servono tutte le tue abilità da detective.",
    ];

    const newsAndGossipPhrases = [
        "Ho sentito dire che Franco era molto temuto nel mondo dell'arte... bah, ci capisco poco io.",
        "Ho letto stamani di un ladro di opere d'arte che è stato catturato. Chissà se c'entra qualcosa con questo caso.",
        "Sai che alcuni sospettati avevano dei conti in sospeso con la vittima?",
        "Mi hanno detto che durante il buffet è successo qualcosa di strano...",
        "Pare che qualcuno si sia assentato durante la pausa...",
        "Ho raccolto delle voci interessanti... ma non so se fidarmi troppo dei pettegolezzi.",
        "Dalla centrale mi dicono che ci sono stati altri casi simili ultimamente.",
        "Sai, a volte le persone nascondono più di quanto mostrano. Bisogna stare attenti ai dettagli.",
        "Ho notato che alcuni sospettati sembravano nervosi durante l'interrogatorio...",
        "C'è chi dice che l'arte può far perdere la testa... chissà se è vero.",
        "Il mondo dell'arte è pieno di segreti, Marty. Forse qualcuno voleva davvero mettere le mani su quell'opera. Mi chiedo perché...",
        "Si dice in giro che le opere stanno sparendo misteriosamente. Potrebbe essere collegato a questo caso?",
    ];

    const hintsPhrases = [
        "Incalza i sospettati per quello che hanno detto, potresti scoprire qualcosa di interessante.",
        "Fai attenzione alle contraddizioni nelle loro storie...",
        "Non dimenticare di esaminare la scena del delitto, potrebbe darti indizi preziosi.",
        "Ascolta bene le loro risposte, a volte dicono più di quello che pensano.",
        "Ricordati di utilizzare tutto quello che hai a disposizione, al giorno d'oggi ci sono tanti strumenti utili.",
        "La dinamica delle luci potrebbe essere importante, non trascurarla.",
        "Controlla se qualcuno aveva accesso alla cucina, potrebbe essere rilevante.",
        "Non sottovalutare nessuno, anche il più tranquillo potrebbe nascondere qualcosa.",
        "A volte un piccolo dettaglio può cambiare tutto. Sii meticolosa!",
        "Rifletti sui moventi di ciascun sospettato, potrebbero aiutarti a capire chi è il colpevole.",
        "Ricordati che l'assassino mente sempre, cerca di non farti ingannare. Ma anche gli altri potrebbero avere qualcosa da nascondere!",
    ];

    function getRandomPhrase(phrasesArray) {
        return phrasesArray[Math.floor(Math.random() * phrasesArray.length)];
    }

    function closeGalloModal() {
        const contentWrapper = document.getElementById('content-wrapper');
        const logoContainer = document.getElementById('logo-container');
        
        if (galloModal) {
            galloModal.classList.add('zoom-close');
            
            // Rimuovi blur
            if (contentWrapper) {
                contentWrapper.classList.remove('blur-effect');
            }
            if (logoContainer) {
                logoContainer.classList.remove('blur-effect');
            }
            
            setTimeout(function() {
                galloModal.style.display = 'none';
                galloModal.classList.remove('is-active', 'zoom-close');
            }, 600);
        }
    }

    if (galloButton) {
        galloButton.addEventListener('click', function() {
            const contentWrapper = document.getElementById('content-wrapper');
            const logoContainer = document.getElementById('logo-container');
            
            if (galloModal) {
                galloModal.style.display = 'flex';
                galloModal.classList.add('is-active', 'zoom-in-out-box');
                
                // Aggiungi blur allo sfondo
                if (contentWrapper) {
                    contentWrapper.classList.add('blur-effect');
                }
                if (logoContainer) {
                    logoContainer.classList.add('blur-effect');
                }
            }
        });
    }

    if (galloOption1) {
        galloOption1.addEventListener('click', function() {
            Swal.fire({
                text: getRandomPhrase(smallTalkPhrases),
                imageUrl: './img/dialogue gallo.png',
                imageWidth: 150,
                imageAlt: 'Gallo',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                background: '#fef9cf'
            });
        });
    }

    if (galloOption2) {
        galloOption2.addEventListener('click', function() {
            Swal.fire({
                text: getRandomPhrase(newsAndGossipPhrases),
                imageUrl: './img/dialogue gallo.png',
                imageWidth: 150,
                imageAlt: 'Gallo',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                background: '#fef9cf'
            });
        });
    }

    if (galloOption3) {
        galloOption3.addEventListener('click', function() {
            Swal.fire({
                text: getRandomPhrase(hintsPhrases),
                imageUrl: './img/dialogue gallo.png',
                imageWidth: 150,
                imageAlt: 'Gallo',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                background: '#fef9cf'
            });
        });
    }

    if (galloOption4) {
        galloOption4.addEventListener('click', function() {
            closeGalloModal();
        });
    }

    if (galloModalBackground) {
        galloModalBackground.addEventListener('click', closeGalloModal);
    }
    
    if (sospettatiButton) {
        sospettatiButton.addEventListener('click', function() {
            const logoContainer = document.getElementById('logo-container');
            const contentWrapper = document.getElementById('content-wrapper');
            const portamoduliContainer = document.getElementById('portamoduli-container');
            
            // Nascondi logo e content-wrapper
            if (logoContainer) {
                logoContainer.classList.add('transition-out');
                setTimeout(function() {
                    logoContainer.classList.add('hidden');
                }, 800);
            }
            
            if (contentWrapper) {
                contentWrapper.classList.add('transition-out');
                setTimeout(function() {
                    contentWrapper.classList.add('hidden');
                }, 800);
            }
            
            // Mostra portamoduli dopo il fade-out
            if (portamoduliContainer) {
                setTimeout(function() {
                    portamoduliContainer.classList.remove('hidden');
                    portamoduliContainer.classList.add('fall-and-bounce');
                    if (backButtonContainer) {
                        backButtonContainer.classList.remove('hidden');
                    }
                }, 800);
            }
        });
    }

    if (incriminaButton) {
        incriminaButton.addEventListener('click', function() {
            const logoContainer = document.getElementById('logo-container');
            const contentWrapper = document.getElementById('content-wrapper');
            const incriminaContainer = document.getElementById('incrimina-container');
            
            // Nascondi logo e content-wrapper
            if (logoContainer) {
                logoContainer.classList.add('transition-out');
                setTimeout(function() {
                    logoContainer.classList.add('hidden');
                }, 800);
            }
            
            if (contentWrapper) {
                contentWrapper.classList.add('transition-out');
                setTimeout(function() {
                    contentWrapper.classList.add('hidden');
                }, 800);
            }
            
            // Mostra incrimina dopo il fade-out
            if (incriminaContainer) {
                setTimeout(function() {
                    incriminaContainer.classList.remove('hidden');
                    incriminaContainer.classList.add('fall-and-bounce');
                    if (backButtonContainer) {
                        backButtonContainer.classList.remove('hidden');
                    }
                    if (incriminaActions) {
                        incriminaActions.classList.remove('hidden');
                    }
                }, 800);
            }
        });
    }

    // Toggle selezione/deselezione dei sospettati nella bacheca "Incrimina"
    if (incriminaContainerEl) {
        const incriminaImgs = incriminaContainerEl.querySelectorAll('.image img');
        incriminaImgs.forEach(function(img) {
            img.addEventListener('click', function() {
                img.classList.toggle('selected');
                updateConfirmIncriminaState();
            });
        });
    }

    // Verifica selezione corretta per "Incrimina"
    const CORRECT_SUSPECTS = ['giotto', 'marie'];

    function getSelectedSuspects() {
        if (!incriminaContainerEl) return [];
        const selectedImgs = incriminaContainerEl.querySelectorAll('.image img.selected');
        return Array.from(selectedImgs).map(img => {
            const src = img.getAttribute('src') || '';
            const match = src.match(/\/img\/([a-z]+)\.png$/i);
            return match ? match[1].toLowerCase() : null;
        }).filter(Boolean);
    }

    function arraysEqualAsSet(a, b) {
        if (a.length !== b.length) return false;
        const setA = new Set(a);
        for (const item of b) {
            if (!setA.has(item)) return false;
        }
        return true;
    }

    function updateConfirmIncriminaState() {
        if (!confirmIncriminaButton) return;
        const hasSelection = getSelectedSuspects().length > 0;
        confirmIncriminaButton.disabled = !hasSelection;
    }

    updateConfirmIncriminaState();

    if (confirmIncriminaButton) {
        confirmIncriminaButton.addEventListener('click', function() {
            const selected = getSelectedSuspects();

            if (selected.length === 0) {
                Swal.fire({
                    imageUrl: './img/sad.png',
                    imageWidth: 150,
                    imageAlt: 'Selezione vuota',
                    title: 'Nessuno selezionato',
                    text: 'Seleziona uno o più sospettati.',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }

            if (arraysEqualAsSet(selected, CORRECT_SUSPECTS)) {
                Swal.fire({
                    imageUrl: './img/giotto.png',
                    imageWidth: 150,
                    imageAlt: 'Selezione corretta',
                    title: 'Giotto',
                    text: 'Sì, sono io il colpevole! Non potevo più sopportare il suo modo di fare. Sono pronto, portatemi pure via!',
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    denyButtonColor: '#dc3545',
                    confirmButtonText: 'Arresta solo Giotto',
                    denyButtonText: 'Arresta anche Marie'
                }).then((result) => {
                    if (result.isConfirmed) {
                        playEndingMusicTransition();
                        Swal.fire({
                            imageUrl: './img/ending1.png',
                            imageWidth: 300,
                            imageAlt: 'Foto scena',
                            title: 'Il peso di una sola colpa',
                            width: 700,
                            background: '',
                            html: `<div style="max-height: 40vh; overflow-y: auto; text-align: left; padding-right: .5rem;">Giotto fu l'unico a essere arrestato. Quando le manette scattarono ai suoi polsi, nella sala nessuno parlò, ma si poteva percepire un triste sollievo.<br><br> Detective Marty incominciò a svelare la sua teoria e la verità emerse poco a poco.<br><br> Franco da Vinci era un miliardario arrogante, alcolizzato, coinvolto in affari oscuri e privi di scrupoli. L'arte, per lui, non era bellezza, ma pura merce di scambio. Comprava quadri per rivenderli al miglior offerente… o distruggerli.<br><br> Quella sera all'asta c'era <i>Il Bacio</i>. Un dipinto che parlava d'amore. Un'opera che la sua giovane moglie, Marie da Vinci — alias Marie Schiele — adorava profondamente. Forse non era un caso: Marie era discendente dell'omonimo pittore, grande amico di Klimt, e sentiva quell'arte come parte del proprio sangue. L'idea che Franco potesse distruggere il quadro… Doveva fermarlo. A qualunque costo.<br><br> Giotto e Marie si conoscevano da anni. Si erano incontrati a Vienna, durante un Erasmus. Da quell'incontro era nata una relazione segreta. Insieme avevano deciso di agire.<br><br> Durante il buffet, Marie fece cadere di proposito un piatto a base di crostacei. Un gesto banale, quasi invisibile nella confusione. Giotto colse quell'attimo per cospargere gli opuscoli dell'asta con una sostanza altamente allergenica. Conoscevano bene le abitudini di Franco: sapevano che Anna lo irritava sempre, che l'ansia lo portava a mangiarsi le unghie. Anche quella sera non resistette. Non toccò cibo, ma ingerì comunque la sostanza.<br><br> Lo shock anafilattico fu rapido, letale.<br><br> Marie corse verso di lui e, dopo che Giotto fece intenzionalmente cadere il martello d'asta, creando un boato assurdo per la sala, piantò il coltello dietro la sua schiena, ma Franco era già morto.<br><br> L'Agente Gallo si prese la briga di spiegare ai presenti cos'era successo. Marie scoppiò in lacrime, ma tutti furono molto comprensivi e si riunirono in un grande e caloroso abbraccio (un'idea di James!).<br><br> Giotto si prese tutta la colpa. Marie rimase libera. La sua vita proseguì tra sale d'arte e stanze d'aste, accompagnata dal ricordo di un amore impossibile e di un quadro che l'avrebbe accompagnata per sempre: un <i>Bacio</i> che non potrà mai più realizzarsi.</div>`,
                            confirmButtonText: 'Fine'
                        }).then(() => {
                            window.location.href = 'index.html';
                        });
                    } else if (result.isDenied) {
                        playEndingMusicTransition();
                        Swal.fire({
                            imageUrl: './img/ending2.png',
                            imageWidth: 300,
                            imageAlt: 'Foto scena',
                            title: 'Not even the gods above',
                            width: 700,
                            background: '',
                            html: `<div style="max-height: 40vh; overflow-y: auto; text-align: left; padding-right: .5rem;">
                                Il detective Marty li osservò a lungo, uno accanto all'altra. Silenziosi. Stanchi. Uniti da qualcosa che andava oltre la paura.<br><br> Questa volta non ci furono eccezioni.<br><br> Le indagini avevano parlato chiaro: l'omicidio di Franco da Vinci non era stato il gesto isolato di un uomo innamorato, ma il risultato di una decisione condivisa. Ogni dettaglio, ogni coincidenza, ogni silenzio conduceva sempre allo stesso punto: avevano pianificato tutto insieme.<br><br> Franco era un uomo difficile da compiangere. Presuntuoso, violento nei modi, corrotto dal denaro. L'arte, per lui, era solo un mezzo. Aveva affari loschi con chissà quale organizzazione. Il Bacio, il quadro all'asta quella sera, rappresentava tutto ciò che disprezzava… e tutto ciò che Marie amava. La distruzione imminente dell'opera era stata la scintilla.<br><br> Marie, discendente di Schiele, non sopportava l'idea che quell'opera venisse distrutta. Giotto, che l'amava da anni, aveva scelto di seguirla. Quel viaggio a Vienna li aveva uniti; quella sala d'aste li aveva condannati.<br><br> Il piano era semplice: far cadere apposta il piatto di crostacei; mettere una sostanza allergizzante sugli opuscoli; contare sulla certezza che Franco, nervoso come sempre, si sarebbe mangiato le unghie; usare il coltello, infine, non per uccidere ma per depistare.<br><br> Quando Franco crollò a terra, il destino era già segnato.<br><br> Giotto venne arrestato per omicidio colposo aggravato; Marie per concorso in omicidio e depistaggio. Nessuno dei due oppose resistenza. Si scambiarono solo uno sguardo, breve ma intenso.<br><br> Il Bacio venne sequestrato e affidato al museo di Anna Monet, la quale rincuorò i ragazzi assicurando che l'opera sarebbe stata per sempre in buone mani. Sopravvisse a Franco, ai tribunali e allo scandalo.<br><br> Giotto e Marie si persero fra sentenze, celle e amore. Rimasero in carcere a lungo, ma questo non li allontanò di un centimetro. Anche se in celle separate, anche se in stanze distanti, sapevano di aver fatto la cosa giusta e che il loro amore avrebbe prevalso su ogni forma di giustizia. <br><br> Alcuni anni dopo, Sofia pubblicò un libro riguardo questa storia e diede così inizio al suo percorso da scrittrice con: 'Not even the gods above'.
                            </div>`,
                            confirmButtonText: 'Fine'
                        }).then(() => {
                            window.location.href = 'index.html';
                        });
                    }
                });
            } else {
                Swal.fire({
                    imageUrl: './img/sad.png',
                    imageWidth: 150,
                    imageAlt: 'Selezione errata',
                    title: 'Mh, non torna…',
                    text: 'Forse ti sta sfuggendo qualcosa. Riprova.',
                    confirmButtonColor: '#dc3545'
                });
            }
        });
    }

    if (backButton) {
        backButton.addEventListener('click', function() {
            const logoContainer = document.getElementById('logo-container');
            const contentWrapper = document.getElementById('content-wrapper');
            const portamoduliContainer = document.getElementById('portamoduli-container');
            const incriminaContainer = document.getElementById('incrimina-container');
            
            // Nascondi portamoduli o incrimina con animazione inversa
            if (!portamoduliContainer.classList.contains('hidden')) {
                portamoduliContainer.classList.remove('fall-and-bounce');
                portamoduliContainer.classList.add('rise-and-fade');
                setTimeout(function() {
                    portamoduliContainer.classList.add('hidden');
                    portamoduliContainer.classList.remove('rise-and-fade');
                    if (backButtonContainer) {
                        backButtonContainer.classList.add('hidden');
                    }
                }, 1000);
            } else if (!incriminaContainer.classList.contains('hidden')) {
                incriminaContainer.classList.remove('fall-and-bounce');
                incriminaContainer.classList.add('rise-and-fade');
                setTimeout(function() {
                    incriminaContainer.classList.add('hidden');
                    incriminaContainer.classList.remove('rise-and-fade');
                    if (backButtonContainer) {
                        backButtonContainer.classList.add('hidden');
                    }
                    if (incriminaActions) {
                        incriminaActions.classList.add('hidden');
                    }
                }, 1000);
            }
            
            // Mostra logo e content-wrapper
            if (logoContainer) {
                setTimeout(function() {
                    logoContainer.classList.remove('hidden', 'transition-out');
                }, 1000);
            }
            
            if (contentWrapper) {
                setTimeout(function() {
                    contentWrapper.classList.remove('hidden', 'transition-out');
                }, 1000);
            }
        });
    }

    // Dati dei personaggi con risposte specifiche
    const charactersData = {
        anna: { 
            name: "Anna Monet", 
            movente: "./audio/anna.mp3",
            answers: [
                {
                    keywords: ["giotto"],
                    response: "È stato un piacere parlare con lui, gli ho condiviso le mie tattiche dell'asta, mi ha risposto che si porterà i segreti nella tomba, ahahah!"
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena è una ragazza molto dolce e appassionata di social. Durante l'asta lei e Marie si divertivano a vedere Reels e TikTok insieme! Che bella la gioventù!"
                },
                {
                    keywords: ["james", "dalì"],
                    response: "Il cuoco? Sembrava molto nervoso quella sera, forse per la pressione di servire un evento così importante. Ma è davvero un tenerone!"
                },
                {
                    keywords: ["lucas", "picasso"],
                    response: "Lucas è sempre arrabbiato col mondo. Credo avesse avuto dei problemi con Franco."
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie è sempre stata al fianco di Franco, anche se lui l'ha sempre trattata male, soprattutto quando era ubriaco. Povera ragazza..."
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Marco parlava sempre di quanto aveva bisogno che l'asta andasse bene. Non so perché era così preoccupato..."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Sofia è una fotografa molto talentuosa. L'ho vista spostarsi nervosamente durante tutta la serata, ma non ha scattato molte foto. D'altronde è vietato fare foto durante l'asta!"
                },
                {
                    keywords: ["franco"],
                    response: "Franco era un uomo terribile, lo sappiamo tutti. Arrogante, prepotente, crudele. Ha rovinato le vite di molte persone. Non mi sorprende che qualcuno l'abbia voluto uccidere."
                },
                {
                    keywords: ["ninfe", "stagn"],
                    response: "<i>Les Nymphéas</i> è una delle mie opere preferite! Franco, purtroppo, mi battè ad un'asta e riuscì a portarselo a casa. Da quel giorno non l'ho più rivisto... nessuno, lo ha più rivisto."
                },
                {
                    keywords: ["allerg", "cetiriz"],
                    response: "La Cetirizina? Mi serve per la mia allergia alle arachidi. La cucina di James è americana, anche se mi ha assicurato di essere stato molto attento, non si sa mai."
                }
            ]
        },
        elena: { 
            name: "Elena Klimt", 
            movente: "./audio/elena.mp3",
            answers: [
                {
                    keywords: ["opusc", "desig"],
                    response: "Erano molto carini, sono fan di tutto ciò che è aesthetic! Ho notato che tutti erano molto concentrati a sfogliarli, ma concentratissimi ti dico! Franco girava costantemente le pagine del catalogo, e così anche gli altri! Penso stessero tutti pianificando le loro mosse per l'asta, era una competizione all'ultimo spicciolo!"
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna è una collezionista molto esperta, mi ha dato consigli per quest'asta, ero molto nervosa ma mi ha rassicurata come farebbe una madre!"
                },
                {
                    keywords: ["giotto"],
                    response: "Giotto è stato molto competente, ha spiegato tutto in modo impeccabile e l'ho visto aiutare Marco con l'impianto elettrico. Sembra una persona tranquilla e disponibile."
                },
                {
                    keywords: ["james", "dalì"],
                    response: "La cucina di James era deliziosa, è stato bravissimo, ha intavolato tutto in maniera molto aesthetic come piace a me! Però è molto sbadato, quando si sono riaccese le luci ha fatto cadere diversi piatti, non vi dico che casino!"
                },
                {
                    keywords: ["lucas", "picasso"],
                    response: "Lucas quella sera sembrava arrabbiato, credo Franco gli avesse detto qualcosa di offensivo."
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie è la mia nuova amica! L'ho aiutata a raccogliere il cibo che aveva fatto cadere e da lì abbiamo iniziato a parlare. Abbiamo tantissime cose in comune!"
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Lo conosco, è famoso online per essere un... come si chiamavano mmmmh... fuffaguru sì! Non so che significhi però..."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Sofia è una mia amica! È molto brava con la sua macchina fotografica. Anche se fa questo lavoro da poco, mi piacerebbe collaborare con lei per i miei contenuti!"
                },
                {
                    keywords: ["franco"],
                    response: "Franco è stato molto scortese con tutti, era proprio un boomer! Non capiva nulla di social e di arte, mi faceva arrabbiare solo a sentirlo parlare!"
                }
            ]
        },
        giotto: { 
            name: "Giotto", 
            movente: "./audio/giotto.mp3",
            answers: [
                {
                    keywords: ["luc", "marco", "munch"],
                    response: "Sì, ho dato una mano al team di Marco per le luci. Purtroppo Marco ha detto che si era dimenticato le forbici da elettricista e non avevano modo di aggeggiare con i cavi."
                },
                {
                    keywords: ["james", "dalì", "erasmus"],
                    response: "Conosco il mio collega, ma l'ho sempre visto troppo stravagante, non siamo così compatibili come dice lui."
                },
                {
                    keywords: ["martel"],
                    response: "Il martelletto? Sì, perdonatemi, l'ho fatto cadere quando ho visto il corpo di Franco, ero sconvolto."
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie? Non la conosco. Mi ricorderei di una bella donna come lei."
                },
                {
                    keywords: ["cognom", "regol"],
                    response: "Una delle regole dell'asta è quella di nascondere il proprio cognome con un nome di un famoso pittore. Inoltre, le aste sono a tempo limitato, quando scatta un orario, l'asta corrente si chiude e si dichiara vincitore l'ultimo offerente: per questo sono così aggressive le offerte!"
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna Monet è un colosso di queste aste, da quanto so. Abbiamo parlato brevemente delle strategie d'asta, è una donna molto intelligente, mi ha raccontato come volesse vincere a tutti i costi stasera. Conosce le abitudini di Franco molto bene."
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena? L'ho vista guardare il catalogo con molto interesse, credo le sia piaciuto."
                },
                {   keywords: ["lucas", "picasso"],
                    response: "Lucas non lo conosco molto bene, mi sembra un tipo piuttosto burbero."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "La fotografa? L'ho vista muoversi per tutta la sala, ma non ha mai scattato foto, o almeno, non mi è sembrato."
                },
                {
                    keywords: ["franco"],
                    response: "Franco era un uomo molto difficile ed esigente. Alcune regole erano imposte da lui, anche se non era l'organizzatore principale. Era molto severo e si impuntava su ogni dettaglio, il che rendeva il lavoro di tutti molto difficile."
                }
            ]
        },
        james: { 
            name: "James Dalì", 
            movente: "./audio/james.mp3",
            answers: [
                {
                    keywords: ["giotto"],
                    response: "<i>Yo</i>, certo che conosco Giotto, è il mio <i>best friendo!</i> Abbiamo fatto Erasmus insieme qualche mese fa, siamo andati in Cina, in Egitto, in Austria, in Inghilterra e ora qua in Italia, siamo <i>on fire</i>! Anche se, a differenza sua, a <i>girls</i> io sono proprio negato…"
                },
                {
                    keywords: ["allerg"],
                    response: "Sono stato attentissimo alle allergie, in particolare al signor Franco, allergico ai crostacei, ma vi posso assicurare che non si è mai avvicinato per mangiare qualcosa, mi guardava come se non fossi adatto a questo lavoro… in realtà, guardava tutti così."
                },
                {
                    keywords: ["coltell", "arma"],
                    response: "Aaaah <i>my friend</i>, <i>I'm so so so sorry</i>, purtroppo è uno dei coltelli della cucina l'arma del delitto, non sono stato attento, ho fallito con la mia carriera, <i>I should be a homeless aaargggh!!!</i>"
                },
                {
                    keywords: ["foto", "padre"],
                    response: "Questo è <i>my dad</i>! Era un cuoco famoso e lavorava qui anche lui molti anni fa… purtroppo, una volta, sbagliò un piatto per il signor Franco e lui lo fece licenziare. Da allora, non l'ho più visto…"
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna? <i>She's so elegant</i>, una signora molto <i>chic</i>! Mi ha fatto i complimenti per il mio cibo, <i>I was so happy</i>!"
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena <i>is sooo sweet</i>, ama tutto ciò che è bello e <i>aesthetic</i>. Ha apprezzato molto la presentazione dei miei piatti!"
                },
                {
                    keywords: ["lucas", "picasso"],
                    response: "Lucas? <i>Oh my</i>, quel tipo è sempre arrabbiato! Non so cosa gli abbia detto Franco, ma sembrava davvero furioso... <i>Not good, not good at all</i>!"
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie è una <i>good girl</i>, mi è dispiaciuto quando l'ho vista piangere per il piatto caduto, si senteva in colpa, ma non era assolutamente colpa sua! Gliel'ho ripreparato subito!"
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Marco organizzava tutto, era <i>everywhere</i>! Sembrava molto stressato, <i>poor guy</i>."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Sofia! Mi ha chiesto di posare con alcuni dei miei piatti durante il buffet, <i>I felt like a celebrity</i>! Ma poi si è ricordata che era vietato fare foto e ha nascosto la macchina fotografica. <i>So clumsy! Ahahah!</i>"
                },
                {
                    keywords: ["franco"],
                    response: "Franco mi guardava con disprezzo, come se fossi un <i>loser</i>. Non ho mai avuto rancore per lui, gli ho offerto il miglior buffet possibile, ma lui non era mai soddisfatto."
                }
            ]
        },
        lucas: { 
            name: "Lucas Picasso", 
            movente: "./audio/lucas.mp3",
            answers: [
                {
                    keywords: ["denunc", "provoc"],
                    response: "Beh, ho chiesto a Franco spiegazioni, dato che non avevo capito il suo commento ironico. Quel bastardo… mi ha fregato vi dico, mi ha fregato!"
                },
                {
                    keywords: ["forbic", "attrezz", "elett"],
                    response: "Le forbici? Le porto sempre con me, non si sa mai quando possano servire."
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna Monet? Una brava donna. Abbiamo scambiato una manciata di chiacchere riguardo le strategie d'asta. Mi è sembrata molto astuta."
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena è una ragazza molto dolce, mi ha chiesto come stavo."
                },
                {
                    keywords: ["giotto"],
                    response: "Giotto? Un tipo tranquillo, niente di particolare. Non lo conosco molto."
                },
                {
                    keywords: ["james", "dalì"],
                    response: "Il cuoco era veramente energico, forse troppo. Il cibo era buono comunque, purtroppo Franco mi ha fatto passare l'appetito."
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie l'ho vista sempre molto sottomessa, lui l'ha trattata malissimo."
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Marco? Mi ha chiesto più volte se fosse tutto a posto con l'asta, sembrava molto preoccupato per l'andamento."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Sofia, l'ex-giornalista. Anche lei ha sofferto a causa di Franco. Capisco perfettamente la sua rabbia."
                },
                {
                    keywords: ["franco"],
                    response: "Franco? Qualcuno doveva fermarlo. Era un uomo crudele, arrogante e prepotente. Ha rovinato la vita di molte persone, me compreso. Non mi sorprende che qualcuno l'abbia ucciso."
                }
            ]
        },
        marie: { 
            name: "Marie da Vinci", 
            movente: "./audio/marie.mp3",
            answers: [
                {
                    keywords: ["anna", "monet"],
                    response: "Anna è l'acerrima nemica di Franco. Una donna molto educata e rispettosa, ma quando si tratta di Franco diventa una stratega formidabile. Solo lei è in grado di innervosirlo così tanto."
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena è stata molto gentile con me strasera. Mi ha aiutata a raccogliere il piatto quando l'ho fatto cadere. Siamo diventate subito amiche!"
                },
                {
                    keywords: ["giotto"],
                    response: "Sembra una persona tranquilla, ma non l'ho mai visto prima d'ora, deve essere un tirocinante."
                },
                {
                    keywords: ["james", "dalì"],
                    response: "James è il cuoco. Mi è dispiaciuto molto per quello che gli è successo..."
                },
                {
                    keywords: ["lucas", "picasso"],
                    response: "Lucas? Ho visto che era molto furioso. Ovviamente Franco gli aveva detto qualcosa... mi dispiace."
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Marco è l'organizzatore principale di questi eventi, è molto famoso in questo ambiente. Era molto nervoso, Franco lo stressava continuamente durante queste serate."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Sofia... Mi dispiace per quello che le ha fatto Franco. Non la biasimo se lo odia."
                },
                {
                    keywords: ["franco"],
                    response: "Franco era mio marito. Mi controllava continuamente, come se non si fidasse di me. Mi umiliava in pubblico, soprattutto quando era ubriaco, però mi sono sempre sentita legata a lui, nonostante tutto. Non meritava di morire così. Trovate il colpevole, per favore."
                }
            ]
        },
        marco: { 
            name: "Marco Munch", 
            movente: "./audio/marco.mp3",
            answers: [
                {
                    keywords: ["luc", "giotto"],
                    response: "Io e il mio team avevamo preparato tutto l'occorrente ma questo edificio purtroppo è molto vecchio e non sapevamo dove mettere mano, per questo ci ha dato una mano Giotto."
                },
                {
                    keywords: ["debit", "casa"],
                    response: "Sfortunatamente ho un grosso debito sulle spalle, quest'asta non doveva andare male per nessun motivo, ma guardate! Il numero di visual è assurdo! Diventerò ricchissimo!!! Ah, devo spegnere la live? Accidenti…"
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna Monet è una cliente importante. Franco temeva molto la sua presenza all'asta."
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena era molto interessata all'aspetto estetico dell'evento. Mi ha fatto i complimenti per l'allestimento, mi sono dato da fare per i social!"
                },
                {
                    keywords: ["james", "dalì"],
                    response: "James è un bravo cuoco, ha preparato tutto alla perfezione. Sono contento di aver scelto lui!"
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie è sempre stata al fianco di Franco, nonostante tutto. Non so come faceva a sopportarlo, è sempre stato un uomo molto difficile. A volte mi chiedo come facesse a stare con lui."
                },
                {
                    keywords: ["franco"],
                    response: "Franco è sempre stato molto importante per queste aste, portava molta reach, ma era un uomo impossibile da gestire. Mi metteva sotto pressione costantemente, voleva che fosse tutto come diceva lui, altrimenti se ne sarebbe andato. Era un incubo lavorare con lui, mi sentivo ricattato ogni volta."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Franco mi aveva avvertito di non farla avvicinare troppo, diceva che era una 'pazza', ma non mi è sembrata pazza per niente, forse un po' goffa perché continuava a voler scattare foto nonostante fosse vietato, ma in realtà è solo una regola che Franco ha imposto, a nessuno interessa realmente."
                }
            ]
        },
        sofia: { 
            name: "Sofia Caravaggio", 
            movente: "./audio/sofia.mp3",
            answers: [
                {
                    keywords: ["fila", "post", "terz", "prim", "panchin"],
                    response: "Verso le 22:07 mi sono spostata dalla terza fila in prima fila, ho avuto difficoltà tutta la sera da dov'ero, volevo cogliere l'occasione perfetta per scattare la foto all'opera più bella del catalogo! E quando si stava per chiudere l'asta, ho preso la macchina fotografica, ho sentito un po' di brusio, un colpo di tosse e si sono spente le luci; si era creata confusione nella sala e poi ho visto Franco accasciato per terra quando si sono riaccese!"
                },
                {
                    keywords: ["portat", "cib", "marie"],
                    response: "Non ricordo cosa avesse fatto cascare Marie, ricordo solo che Franco era molto arrabbiato, quasi come se avesse ammazzato qualcuno! Ops, scusate il brutto gioco di parole…"
                },
                {
                    keywords: ["fals", "fotograf", "notiz", "giornal"],
                    response: "Te ne sei accorta vero? Sei proprio una grande detective. Sì, ero una ex-giornalista che lavorava su un caso di opere false e opere scomparse, ma Franco, che si è offerto volontario per l'intervista, mi ha umiliato in diretta, facendomi passare per una pazza, e per questo ho perso il lavoro."
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna è una donna molto gentile, mi ha rassicurato riguardo la macchina fotografica. Mi ha scoperto subito, ma mi ha fatto semplicemente l'occhiolino."
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena era una mia cara amica. È molto brava con i social, mi piacerebbe collaborare con lei, ma non sono molto esperta in questo campo..."
                },
                {
                    keywords: ["giotto"],
                    response: "Giotto è una persona tranquilla, non abbiamo interagito molto, ma ha fatto benissimo il suo lavoro! Mi dispiace che si sia spaventato così tanto quando ha visto il corpo di Franco, gli è caduto anche il martelletto dallo shock!"
                },
                {
                    keywords: ["james", "dalì"],
                    response: "James è un cuoco molto talentuoso. Mi ha chiesto di posare con alcuni dei suoi piatti per delle foto, ero entusiasta, ma poi mi sono ricordata che era vietato fare foto durante l'asta... ops!"
                },
                {
                    keywords: ["lucas", "picasso"],
                    response: "Lucas è stato provocato da Franco stasera. Lo capisco perfettamente, Franco rovinava le vite delle persone."
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Marco è l'organizzatore, ho chiesto se potevo esserci anche io per quest'asta e mi ha accolto volentieri. Era molto nervoso, continuava a controllare che tutto fosse perfetto, poveretto."
                },
                {
                    keywords: ["franco"],
                    response: "Ero una giornalista che stava indagando su un giro di opere d'arte false e scomparse, e lui si è offerto volontario per un'intervista. Durante l'intervista mi ha umiliato in diretta, facendomi passare per una pazza. Ho perso il lavoro e la reputazione a causa sua. Non posso dire che mi dispiace per la sua morte, ma non sono stata io a farlo."
                }
            ]
        }
    };

    // Variabile globale per tracciare il personaggio corrente
    let currentCharacter = null;

    // Event listener per i personaggi
    const characterColumns = document.querySelectorAll('[data-character]');
    const modal = document.getElementById('character-modal');
    const modalImage = document.getElementById('modal-character-image');
    const modalName = document.getElementById('modal-character-name');
    const modalMovente = document.getElementById('modal-character-movente');
    const closeModalButton = document.getElementById('close-modal');
    const modalBackground = document.getElementById('modal-background');

    function startInterruption() {
        if (!ostAudio) return;
        if (interruptionCount === 0) {
            ostWasPlayingBeforeInterruption = !ostAudio.paused && !userPausedMusic;
            if (ostWasPlayingBeforeInterruption) {
                pauseOstWithFade();
            }
        }
        interruptionCount += 1;
    }

    function endInterruption() {
        if (!ostAudio || interruptionCount === 0) return;
        interruptionCount -= 1;
        if (interruptionCount === 0) {
            if (ostWasPlayingBeforeInterruption && !userPausedMusic) {
                resumeOstWithFade();
            }
            ostWasPlayingBeforeInterruption = false;
        }
    }

    function handleSuspectAudioPlay() {
        startInterruption();
    }

    function handleSuspectAudioStop() {
        endInterruption();
    }

    if (modalMovente) {
        modalMovente.addEventListener('play', handleSuspectAudioPlay);
        modalMovente.addEventListener('ended', handleSuspectAudioStop);
        modalMovente.addEventListener('pause', function() {
            // Avoid double-calling when 'ended' fires; rely on interruptionActive flag.
            handleSuspectAudioStop();
        });
    }

    characterColumns.forEach(function(column) {
        column.addEventListener('click', function() {
            const characterId = column.getAttribute('data-character');
            const characterData = charactersData[characterId];
            const bacheca = document.querySelector('.bacheca');

            if (characterData && modal) {
                // Salva il personaggio corrente
                currentCharacter = characterId;
                
                // Imposta i dati del personaggio nel modal
                modalImage.src = './img/' + characterId + '.png';
                modalImage.alt = characterData.name;
                modalName.textContent = characterData.name;
                modalMovente.src = characterData.movente;

                // Aggiungi blur alla bacheca
                if (bacheca) {
                    bacheca.classList.add('blur-effect');
                }

                // Mostra il modal
                modal.classList.remove('hidden');
                modal.classList.add('is-active');
                modal.classList.add('zoom-in-out-box');
            }
        });
    });

    // Funzione per chiudere il modal
    function closeModal() {
        const bacheca = document.querySelector('.bacheca');
        const userAnswer = document.getElementById('user-answer');
        
        if (modal) {
            modal.classList.remove('zoom-in-out-box-retarded');
            modal.classList.add('zoom-close');
            
            // Rimuovi blur dalla bacheca
            if (bacheca) {
                bacheca.classList.remove('blur-effect');
            }
            
            // Ferma l'audio
            if (modalMovente) {
                modalMovente.pause();
                modalMovente.currentTime = 0;
            }
            
            // Pulisci la textarea
            if (userAnswer) {
                userAnswer.value = '';
            }
            
            setTimeout(function() {
                modal.classList.add('hidden');
                modal.classList.remove('is-active');
                modal.classList.remove('zoom-close');
            }, 600);
        }
    }

    // Chiudi il modal col bottone
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Chiudi il modal cliccando sul background

    // Gestione invio risposta
    const submitAnswerButton = document.getElementById('submit-answer');
    const userAnswerTextarea = document.getElementById('user-answer');

    if (submitAnswerButton && userAnswerTextarea) {
        submitAnswerButton.addEventListener('click', function() {
            const userAnswer = userAnswerTextarea.value.trim().toLowerCase();
            
            if (!userAnswer) {
                Swal.fire({
                    imageUrl: './img/mmm.png',
                    imageWidth: 150,
                    imageAlt: 'Domanda',
                    title: 'Hai un lapsus?',
                    text: 'Inserisci una domanda prima di chiedere!',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            if (!currentCharacter) {
                return;
            }

            const characterData = charactersData[currentCharacter];
            let foundAnswer = null;

            // Cerca la parola chiave nella risposta dell'utente
            for (let i = 0; i < characterData.answers.length; i++) {
                const answerObj = characterData.answers[i];
                for (let j = 0; j < answerObj.keywords.length; j++) {
                    if (userAnswer.includes(answerObj.keywords[j])) {
                        foundAnswer = answerObj.response;
                        break;
                    }
                }
                if (foundAnswer) break;
            }

            if (foundAnswer) {
                Swal.fire({
                    imageUrl: './img/yeah.png',
                    imageWidth: 150,
                    imageAlt: 'Risposta corretta',
                    title: characterData.name,
                    html: foundAnswer,
                    confirmButtonColor: '#28a745'
                });
            } else {
                Swal.fire({
                    imageUrl: './img/sad.png',
                    imageWidth: 150,
                    imageAlt: 'Risposta sbagliata',
                    title: 'Non capisco...',
                    text: 'Prova a fare una domanda più specifica, detective!',
                    confirmButtonColor: '#dc3545'
                });
            }

            // Pulisci la textarea dopo la verifica
            userAnswerTextarea.value = '';
        });
    }
    if (modalBackground) {
        modalBackground.addEventListener('click', closeModal);
    }

    // iPhone Keypad functionality
    const iphoneButton = document.getElementById('iphone_button');
    const iphoneKeypad = document.getElementById('iphone-keypad');
    const closeKeypad = document.getElementById('close-keypad');
    const phoneDisplay = document.getElementById('phone-display');
    const phoneKeys = document.querySelectorAll('.phone-key');
    const callButton = document.getElementById('call-button');
    const deleteButton = document.getElementById('delete-button');

    let phoneNumber = '';
    let currentAudio = null;

    if (iphoneButton) {
        iphoneButton.addEventListener('click', function() {
            if (iphoneKeypad) {
                // Mostra il keypad e avvia l'animazione
                iphoneKeypad.classList.remove('hidden');
                iphoneKeypad.classList.add('iphone-opening');
                phoneNumber = '';
                phoneDisplay.textContent = '';
                
                // Aggiungi blur allo sfondo
                const background = document.querySelector('.background_image');
                if (background) {
                    background.classList.add('bg-blur-phone');
                }
                
                // Rimuovi la classe di animazione dopo che è completata
                setTimeout(() => {
                    iphoneKeypad.classList.remove('iphone-opening');
                }, 400);
            }
        });
    }

    if (closeKeypad) {
        closeKeypad.addEventListener('click', function() {
            if (iphoneKeypad) {
                // Avvia l'animazione di chiusura
                iphoneKeypad.classList.add('iphone-closing');
                
                // Rimuovi blur dallo sfondo
                const background = document.querySelector('.background_image');
                if (background) {
                    background.classList.remove('bg-blur-phone');
                }
                
                // Nascondi il keypad dopo l'animazione
                setTimeout(() => {
                    iphoneKeypad.classList.add('hidden');
                    iphoneKeypad.classList.remove('iphone-closing');
                }, 300);
                
                phoneNumber = '';
                phoneDisplay.textContent = '';
                
                // Interrompi l'audio se in riproduzione
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    // pause() triggers interruption end via listener
                    currentAudio = null;
                }
            }
        });
    }

    phoneKeys.forEach(function(key) {
        key.addEventListener('click', function() {
            const keyValue = this.parentElement.getAttribute('data-key');
            phoneNumber += keyValue;
            phoneDisplay.textContent = phoneNumber;
            
            // Effetto visivo al click
            this.style.backgroundColor = '#2a2a2a';
            setTimeout(() => {
                this.style.backgroundColor = '#141414';
            }, 150);
        });
    });

    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            if (phoneNumber.length > 0) {
                phoneNumber = phoneNumber.slice(0, -1);
                phoneDisplay.textContent = phoneNumber;
            }
        });
    }

    if (callButton) {
        callButton.addEventListener('click', function() {
            if (phoneNumber.length > 0) {
                // Ferma l'audio precedente se in riproduzione
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }

                const phoneAudioSrc = phoneNumber === '1155103' ? './audio/dexter.mp3' : './audio/misscall.mp3';
                const phoneAudio = new Audio(phoneAudioSrc);

                const cleanupInterruption = () => {
                    phoneAudio.removeEventListener('ended', cleanupInterruption);
                    phoneAudio.removeEventListener('pause', cleanupInterruption);
                    endInterruption();
                };

                phoneAudio.addEventListener('ended', cleanupInterruption);
                phoneAudio.addEventListener('pause', cleanupInterruption);

                startInterruption();
                phoneAudio.play();
                currentAudio = phoneAudio;
            }
        });
    }

    // Notebook button functionality
    const notebookButton = document.getElementById('notebook_button');
    
    if (notebookButton) {
        notebookButton.addEventListener('click', function() {
            Swal.fire({
                title: 'Cosa sai?',
                html: '<div style="background: linear-gradient(transparent, transparent calc(1.5em - 1px), #d4d4d4 calc(1.5em - 1px), #d4d4d4 1.5em); background-size: 100% 1.5em; line-height: 1.5em; padding: 0.5em 1em; text-align: left; font-family: \'IM Fell DW Pica\', serif;">Tu e Gallo siete arrivati alle 19:20 per l\'inizio del buffet alle 19:30. Durante il buffet non avete notato niente di strano e avete mangiato mangiato e ancora mangiato. Dopo 30 min siete stati accompagnati fuori dalla stanza dove avete aspettato per più di 2 ore, nell\'eventualità succedesse qualcosa.<br> E purtroppo, è successo qualcosa.<br><br> Trova il colpevole, prima che possa farla franca!</div>',
                imageUrl: './img/mmm.png',
                imageWidth: 150,
                imageAlt: 'Notebook icon',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Are',
                background: '#fef9cf'
            });
        });
    }
});
