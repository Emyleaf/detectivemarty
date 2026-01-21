window.addEventListener('load', function() {
    const sospettatiButton = document.getElementById('sospettati_button');
    const backButton = document.getElementById('back-button');
    const backButtonContainer = document.getElementById('back-button-container');
    
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

    if (backButton) {
        backButton.addEventListener('click', function() {
            const logoContainer = document.getElementById('logo-container');
            const contentWrapper = document.getElementById('content-wrapper');
            const portamoduliContainer = document.getElementById('portamoduli-container');
            
            // Nascondi portamoduli con animazione inversa
            if (portamoduliContainer) {
                portamoduliContainer.classList.remove('fall-and-bounce');
                portamoduliContainer.classList.add('rise-and-fade');
                setTimeout(function() {
                    portamoduliContainer.classList.add('hidden');
                    portamoduliContainer.classList.remove('rise-and-fade');
                    if (backButtonContainer) {
                        backButtonContainer.classList.add('hidden');
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

            ]
        },
        giotto: { 
            name: "Giotto", 
            movente: "./audio/giotto.mp3",
            answers: [
                {
                    keywords: ["luc", "marco"],
                    response: "Sì, ho dato una mano al team di Marco per le luci. Purtroppo Marco ha detto che si era dimenticato le forbici da elettricista e non avevano modo di aggeggiare con i cavi."
                },
                {
                    keywords: ["james", "dalì", "erasmus"],
                    response: "Conosco il mio collega, ma l'ho sempre visto troppo stravagante, non siamo così compatibili come dice lui."
                },
                {
                    keywords: ["marie"],
                    response: "Marie? Non la conosco. Mi ricorderei di una bella donna come lei."
                },
                {
                    keywords: ["cognom", "regol"],
                    response: "Una delle regole dell'asta è quella di nascondere il proprio cognome con un nome di un famoso pittore. Inoltre, le aste sono a tempo limitato, quando scatta un orario, l'asta corrente si chiude e si dichiara vincitore l'ultimo offerente: per questo sono così aggressive le offerte!"
                }
            ]
        },
        james: { 
            name: "James Dalì", 
            movente: "./audio/james.mp3",
            answers: [
                {
                    keywords: ["giotto"],
                    response: "*Yo*, certo che conosco Giotto, è il mio *best friendo!* Abbiamo fatto Erasmus insieme qualche mese fa, siamo andati in Cina, in Egitto, in Austria, in Inghilterra e ora qua in Italia, siamo *on fire*! Anche se, a differenza sua, a *girls* io sono proprio negato…"
                },
                {
                    keywords: ["allerg"],
                    response: "Sono stato attentissimo alle allergie, in particolare al signor Franco, allergico ai crostacei, ma vi posso assicurare che non si è mai avvicinato per mangiare qualcosa, mi guardava come se non fossi adatto a questo lavoro… in realtà, guardava tutti così."
                },
                {
                    keywords: ["coltell", "arma"],
                    response: "Aaaah *my friend*, *I'm so so so sorry*, purtroppo è uno dei coltelli della cucina l'arma del delitto, non sono stato attento, ho fallito con la mia carriera, *I should be a homeless aaargggh!!!*"
                },
                {
                    keywords: ["foto", "instagram", "padre"],
                    response: "Questo è *my dad*! Era un cuoco famoso e lavorava qui anche lui molti anni fa… purtroppo, una volta, sbagliò un piatto per il signor Franco e lui lo fece licenziare. Da allora, non l'ho più visto…"
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
                    response: "Le forbici? Le porto sempre con me, non si sa mai quando possono servire."
                },

            ]
        },
        marie: { 
            name: "Marie da Vinci", 
            movente: "./audio/marie.mp3",
            answers: [
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
                    keywords: ["debit"],
                    response: "Sfortunatamente ho un grosso debito sulle spalle, quest'asta non doveva andare male per nessun motivo, ma guardate! Il numero di visual è assurdo! Diventerò ricchissimo!!! Ah, devo spegnere la live? Accidenti…"
                },
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
                    icon: 'question',
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
                    icon: 'success',
                    title: characterData.name,
                    text: foundAnswer,
                    confirmButtonColor: '#28a745'
                });
            } else {
                Swal.fire({
                    icon: 'error',
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
                iphoneKeypad.classList.remove('hidden');
                phoneNumber = '';
                phoneDisplay.textContent = '';
            }
        });
    }

    if (closeKeypad) {
        closeKeypad.addEventListener('click', function() {
            if (iphoneKeypad) {
                iphoneKeypad.classList.add('hidden');
                phoneNumber = '';
                phoneDisplay.textContent = '';
                
                // Interrompi l'audio se in riproduzione
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
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
                
                if (phoneNumber === '1155103') {
                    // Riproduci audio dexter.mp3
                    currentAudio = new Audio('./audio/dexter.mp3');
                    currentAudio.play();

                } else {
                    // Per qualsiasi altro numero, riproduci misscall.mp3
                    currentAudio = new Audio('./audio/misscall.mp3');
                    currentAudio.play();

                }
            }
        });
    }
});
