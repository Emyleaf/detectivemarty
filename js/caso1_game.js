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

    const sospettatiButton = document.getElementById('sospettati_button');
    const galloButton = document.getElementById('gallo_button');
    const backButton = document.getElementById('back-button');
    const backButtonContainer = document.getElementById('back-button-container');
    
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
                    response: "Franco? Era un uomo terribile, lo sappiamo tutti. Arrogante, prepotente, crudele. Ha rovinato le vite di molte persone. Non mi sorprende che qualcuno l'abbia voluto uccidere."
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
                    response: "James sembrava così stressato, poverino! Il cibo era delizioso però, è bravissimo, ha intavolato tutto in maniera molto aesthetic come piace a me!"
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
                    response: "Franco... era così arrogante. Mi guardava dall'alto in basso, come se non fossi degna di essere qui. L'ho odiato immediatamente, anche se comprendo che non significa che lo volessi morto."
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
                    response: "Franco... Era il capo. Un uomo molto difficile e esigente. Non è stato facile lavorare per lui, specialmente considerando tutto ciò che aveva fatto al padre di James."
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
                },
                {
                    keywords: ["anna", "monet"],
                    response: "Anna? *She's so elegant*, una signora molto *chic*! Mi ha fatto i complimenti per il mio cibo, *I was so happy*!"
                },
                {
                    keywords: ["elena", "klimt"],
                    response: "Elena *is sooo sweet*, ama tutto ciò che è bello e *aesthetic*. Ha apprezzato molto la presentazione dei miei piatti!"
                },
                {
                    keywords: ["lucas", "picasso"],
                    response: "Lucas? *Oh my*, quel tipo è sempre arrabbiato! Non so cosa gli abbia detto Franco, ma sembrava davvero furioso... *Not good, not good at all*!"
                },
                {
                    keywords: ["marie", "vinci"],
                    response: "Marie è una *good girl*, mi è dispiaciuto quando l'ho vista piangere per il piatto caduto, si senteva in colpa, ma non era assolutamente colpa sua! Gliel'ho ripreparato subito!"
                },
                {
                    keywords: ["marco", "munch"],
                    response: "Marco organizzava tutto, era *everywhere*! Sembrava molto stressato, *poor guy*."
                },
                {
                    keywords: ["sofia", "caravaggio"],
                    response: "Sofia! Mi ha chiesto di posare con alcuni dei miei piatti durante il buffet, *I felt like a celebrity*! Ma poi si è ricordata che era vietato fare foto e ha nascosto la macchina fotografica. *So clumsy! Ahahah!*"
                },
                {
                    keywords: ["franco"],
                    response: "Franco... *Oh my*, era un vero *bastardo*! Mi guardava con disprezzo, come se fossi un *loser*. Mi ha ricordato tanto quello che ha fatto a mio padre. *I hated him so much*!"
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
                    response: "Franco? Quel bastardo mi ha umiliato pubblicamente in diretta, mi ha distrutto la carriera per uno scherzo crudele. Lo odiavo con tutto il cuore. Qualcuno doveva fermarlo."
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
                    response: "Sembra una persona tranquilla, ma non l'ho mai visto prima d'ora."
                },
                {
                    keywords: ["james", "dalì"],
                    response: "James è il cuoco. Suo padre lavorava qui anni fa... Franco lo aveva fatto licenziare. Quando l'ho saputo mi sono sentita così in colpa..."
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
                    response: "Franco era il mio capo. Mi aveva affidato gli eventi più importanti, ma poi mi metteva sempre sotto pressione con le scadenze e i dettagli. Mi controllava continuamente, come se non mi fidassi. Era esasperante lavorare con lui."
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
                    keywords: ["debit"],
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
                    response: "Franco era il mio socio nei progetti più importanti, ma era un uomo impossibile da gestire. Mi metteva sotto pressione costante con le scadenze, i dettagli, i numeri. Non si contentava mai di niente. Mi pressava sui debiti, sui risultati. Era un incubo lavorare con lui."
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
                    response: "Giotto è una persona tranquilla, non abbiamo interagito molto, ma ha fatto benissimo il suo lavoro!"
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
                    text: foundAnswer,
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

    // Notebook button functionality
    const notebookButton = document.getElementById('notebook_button');
    
    if (notebookButton) {
        notebookButton.addEventListener('click', function() {
            Swal.fire({
                title: 'Cosa sai?',
                html: '<div style="background: linear-gradient(transparent, transparent calc(1.5em - 1px), #d4d4d4 calc(1.5em - 1px), #d4d4d4 1.5em); background-size: 100% 1.5em; line-height: 1.5em; padding: 0.5em 1em; text-align: left; font-family: \'IM Fell DW Pica\', serif;">Tu e Gallo siete arrivati alle 19:20 per l\'inizio del buffet alle 19:30. Durante il buffet non avete notato niente di strano e avete mangiato mangiato e ancora mangiato. Dopo 30 min siete stati accompagnati fuori dalla stanza dove avete aspettato per più di 2 ore, nell\'eventualità succedesse qualcosa. E purtroppo, è successo qualcosa.</div>',
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
