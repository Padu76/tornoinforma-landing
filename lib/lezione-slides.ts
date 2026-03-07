// lib/lezione-slides.ts
// E:\tornoinforma-landing\lib\lezione-slides.ts

export interface Slide {
  id: number
  tipo: 'intro' | 'contenuto' | 'citazione' | 'lista' | 'esercizio' | 'recap'
  titolo: string
  testo: string        // testo visualizzato sulla slide
  narrazio: string     // testo narrazione ElevenLabs (può essere più lungo)
  icona?: string       // emoji decorativa
  highlight?: string   // frase evidenziata in arancione
  punti?: string[]     // lista puntata opzionale
  audioFile?: string   // nome file MP3 in Supabase Storage: corso-audio/{lezioneNum}/{slideId}.mp3
}

export interface LezioneSlides {
  lezioneNum: string
  titolo: string
  slides: Slide[]
  audioBasePath: string // path base Supabase Storage
}

// ─────────────────────────────────────────────
// MODULO 1 — MOTIVAZIONE E MENTALITÀ
// ─────────────────────────────────────────────

const lezione_1_1: LezioneSlides = {
  lezioneNum: '1.1',
  titolo: 'Trova il Tuo Vero Perché',
  audioBasePath: 'corso-audio/1-1',
  slides: [
    {
      id: 1, tipo: 'intro',
      titolo: 'Lezione 1.1',
      testo: 'Trova il Tuo Vero Perché',
      narrazio: 'Benvenuto nella prima lezione del corso Torno in Forma. Oggi parleremo di motivazione. Non della motivazione superficiale che ti fa iscrivere in palestra a gennaio e smettere a febbraio. Della motivazione profonda, quella che resiste nei momenti difficili.',
      icona: '🎯',
      highlight: 'La motivazione superficiale dura settimane. Quella profonda dura anni.',
    },
    {
      id: 2, tipo: 'contenuto',
      titolo: 'I 4 Livelli di Motivazione',
      testo: 'La motivazione ha quattro livelli di profondità. La maggior parte delle persone si ferma al primo.',
      narrazio: 'Esistono quattro livelli di motivazione, e quasi tutti si fermano al primo livello, che è anche il più fragile. Vediamoli insieme.',
      icona: '📊',
      punti: [
        'Livello 1 — Estetica: "Voglio dimagrire, voglio i muscoli" — fragile, dipende dagli specchi',
        'Livello 2 — Salute: "Voglio stare bene, avere più energia" — più solido, ma ancora astratto',
        'Livello 3 — Identità: "Voglio essere una persona attiva e sana" — cambia chi sei',
        'Livello 4 — Valori: "La mia salute è un atto di rispetto verso me stesso e chi amo" — inattaccabile',
      ],
    },
    {
      id: 3, tipo: 'citazione',
      titolo: 'Il Segreto',
      testo: 'Chi ha un perché abbastanza forte sopporta qualsiasi come.',
      narrazio: 'Friedrich Nietzsche diceva: chi ha un perché abbastanza forte sopporta qualsiasi come. Nel fitness questo significa che non è il piano di allenamento a fare la differenza. È la chiarezza sul perché lo stai facendo.',
      icona: '💡',
      highlight: '"Chi ha un perché abbastanza forte sopporta qualsiasi come." — Nietzsche',
    },
    {
      id: 4, tipo: 'contenuto',
      titolo: 'La Tecnica dei 5 Perché',
      testo: 'Per trovare il tuo vero perché, scava in profondità con questa tecnica semplice ma potente.',
      narrazio: 'La tecnica dei cinque perché funziona così: prendi la tua motivazione superficiale e chiediti perché ti importa. Poi chiediti perché di nuovo. E ancora. E ancora. E ancora. Al quinto livello trovi quasi sempre qualcosa di molto più personale e potente.',
      icona: '🔍',
      punti: [
        '"Voglio dimagrire" → Perché?',
        '"Per avere più energia" → Perché ti importa?',
        '"Per essere presente con i miei figli" → Perché?',
        '"Perché voglio vederli crescere e giocare con loro" → Perché?',
        '"Perché sono il genitore che voglio essere" ← QUESTO è il tuo vero perché',
      ],
    },
    {
      id: 5, tipo: 'contenuto',
      titolo: 'Perché la Motivazione da Sola Non Basta',
      testo: 'La motivazione è il carburante per partire. Le abitudini sono il motore che ti porta lontano.',
      narrazio: 'Ecco la verità scomoda: la motivazione è sopravvalutata. È utile per iniziare, ma non puoi fare affidamento su di essa ogni giorno. Ci sono giorni in cui non hai voglia, in cui sei stanco, in cui la vita interferisce. Quei giorni hanno bisogno di sistemi, non di motivazione.',
      icona: '⚙️',
      highlight: 'I professionisti vanno avanti anche senza motivazione. I principianti aspettano di sentirla.',
    },
    {
      id: 6, tipo: 'esercizio',
      titolo: 'Esercizio Pratico',
      testo: 'Prima di andare avanti, completa questi tre esercizi nel tuo worksheet.',
      narrazio: 'Ora è il momento di fermarsi e fare il lavoro. Apri il worksheet della lezione. Hai tre esercizi da completare prima di passare alla prossima lezione.',
      icona: '✍️',
      punti: [
        '1. Applica la tecnica dei 5 Perché alla tua motivazione principale',
        '2. Scrivi una lettera al tuo io di 6 mesi nel futuro',
        '3. Crea la tua mappa dei valori personali (cosa conta davvero per te)',
      ],
    },
    {
      id: 7, tipo: 'recap',
      titolo: 'Recap Lezione 1.1',
      testo: 'Hai completato la prima lezione. Ecco cosa porti con te.',
      narrazio: 'Ottimo lavoro. Facciamo un rapido riassunto di quello che hai imparato oggi.',
      icona: '✅',
      punti: [
        'Esistono 4 livelli di motivazione — punta al 3° e al 4°',
        'La tecnica dei 5 Perché ti aiuta a scavare in profondità',
        'La motivazione da sola non basta — servono sistemi',
        'Hai completato il worksheet con il tuo Perché personale',
      ],
      highlight: 'Prossima lezione: Obiettivi SMART e Piano d\'Azione',
    },
  ],
}

const lezione_1_2: LezioneSlides = {
  lezioneNum: '1.2',
  titolo: "Obiettivi SMART e Piano d'Azione",
  audioBasePath: 'corso-audio/1-2',
  slides: [
    {
      id: 1, tipo: 'intro',
      titolo: 'Lezione 1.2',
      testo: "Obiettivi SMART e Piano d'Azione",
      narrazio: "Nella lezione precedente hai trovato il tuo perché. Ora trasformiamo quel perché in obiettivi concreti e misurabili. Un sogno senza un piano è solo un desiderio.",
      icona: '📋',
      highlight: 'Un sogno senza un piano è solo un desiderio.',
    },
    {
      id: 2, tipo: 'lista',
      titolo: 'Il Framework SMART',
      testo: 'SMART non è solo un acronimo — è un filtro che separa gli obiettivi reali dalle fantasie.',
      narrazio: 'SMART sta per Specifico, Misurabile, Raggiungibile, Rilevante e Temporizzato. Vediamo come applicarlo al fitness in modo concreto, non teorico.',
      icona: '🎯',
      punti: [
        'S — Specifico: non "voglio dimagrire" ma "voglio perdere 8 kg"',
        'M — Misurabile: peso, circonferenze, foto, performance in palestra',
        'A — Achievable: realistico per il tuo stile di vita attuale',
        'R — Rilevante: collegato al tuo vero perché della lezione 1.1',
        'T — Temporizzato: una data concreta, non "il prima possibile"',
      ],
    },
    {
      id: 3, tipo: 'contenuto',
      titolo: 'Micro-Obiettivi Settimanali',
      testo: "L'obiettivo a 12 settimane è la destinazione. I micro-obiettivi settimanali sono i passi.",
      narrazio: "Il problema con gli obiettivi a lungo termine è che sembrano lontani. Quando sono lontani, non motivano abbastanza nel quotidiano. La soluzione è dividere l'obiettivo principale in micro-obiettivi settimanali. Ogni settimana vinci una piccola battaglia.",
      icona: '📅',
      highlight: 'Vinci la settimana. La settimana vince il mese. Il mese vince i 12 mesi.',
    },
    {
      id: 4, tipo: 'contenuto',
      titolo: 'Gestire Aspettative e Impazienza',
      testo: 'Il corpo cambia più lentamente di quanto vuoi. E questo è normale.',
      narrazio: "L'impazienza è il nemico numero uno dei risultati. Il corpo ha i suoi tempi biologici. Non puoi accelerarli oltre un certo punto senza rischiare. Ma puoi imparare a trovare soddisfazione nel processo, non solo nel risultato.",
      icona: '⏳',
      punti: [
        'Settimane 1-2: adattamento nervoso, più forza ma pochi cambiamenti visibili',
        'Settimane 3-4: inizio ricomposizione corporea, energia migliora',
        'Settimane 5-8: prime trasformazioni visibili, abitudini solidificate',
        'Settimane 9-12: risultati evidenti, nuova identità consolidata',
      ],
    },
    {
      id: 5, tipo: 'esercizio',
      titolo: 'Esercizio Pratico',
      testo: 'Tre esercizi da completare nel worksheet prima della prossima lezione.',
      narrazio: 'Apri il worksheet. Hai tre esercizi concreti che ti guideranno nella creazione del tuo piano personale.',
      icona: '✍️',
      punti: [
        '1. Scrivi 3 obiettivi SMART personali per le prossime 12 settimane',
        "2. Crea il tuo piano d'azione settimanale settimana per settimana",
        '3. Identifica i 3 principali ostacoli e scrivi come li affronterai',
      ],
    },
    {
      id: 6, tipo: 'recap',
      titolo: 'Recap Lezione 1.2',
      testo: 'Hai il tuo perché e ora hai anche il tuo piano. È il momento di capire come rendere tutto automatico.',
      narrazio: 'Nella prossima lezione entreremo nella neurologia delle abitudini. Capirai perché certi comportamenti si attivano automaticamente e come sfruttare questo meccanismo a tuo favore.',
      icona: '✅',
      punti: [
        'Il framework SMART trasforma desideri in obiettivi reali',
        'I micro-obiettivi settimanali mantengono alta la motivazione',
        'Il corpo cambia lentamente — la pazienza è una competenza',
        'Hai il tuo piano a 12 settimane scritto e chiaro',
      ],
    },
  ],
}

const lezione_1_3: LezioneSlides = {
  lezioneNum: '1.3',
  titolo: 'La Scienza delle Abitudini',
  audioBasePath: 'corso-audio/1-3',
  slides: [
    {
      id: 1, tipo: 'intro',
      titolo: 'Lezione 1.3',
      testo: 'La Scienza delle Abitudini',
      narrazio: "Il 40% di quello che fai ogni giorno non è una decisione consapevole. È un'abitudine. Il tuo cervello ha automatizzato quei comportamenti per risparmiare energia. Oggi impari a sfruttare questo meccanismo.",
      icona: '🧠',
      highlight: "Il 40% delle nostre azioni quotidiane è automatico. Puoi scegliere quali.",
    },
    {
      id: 2, tipo: 'lista',
      titolo: 'Il Ciclo Segnale-Routine-Ricompensa',
      testo: "Ogni abitudine funziona con lo stesso meccanismo neurologico. Una volta che lo conosci, puoi usarlo.",
      narrazio: "Charles Duhigg nel suo libro 'Il potere delle abitudini' ha descritto il ciclo che governa tutti i nostri comportamenti automatici. Si chiama ciclo abitudinario ed è composto da tre elementi.",
      icona: '🔄',
      punti: [
        'SEGNALE: il trigger che attiva l\'abitudine (ora, luogo, emozione, precedente azione)',
        'ROUTINE: il comportamento automatico che segue il segnale',
        'RICOMPENSA: il beneficio che rinforza il ciclo e lo rende permanente',
      ],
    },
    {
      id: 3, tipo: 'contenuto',
      titolo: 'Habit Stacking',
      testo: 'Il metodo più efficace per creare nuove abitudini fitness: agganciarle a quelle che hai già.',
      narrazio: "L'habit stacking, o catena di abitudini, funziona così: identifichi un'abitudine che fai già ogni giorno — il caffè del mattino, il pranzo, il dentifricio — e agganci la nuova abitudine fitness subito prima o dopo.",
      icona: '🔗',
      highlight: '"Dopo aver fatto [ABITUDINE ESISTENTE], farò [NUOVA ABITUDINE FITNESS]"',
      punti: [
        '"Dopo il caffè mattutino, faccio 10 minuti di stretching"',
        '"Prima di pranzo, faccio 5 minuti di camminata"',
        '"Dopo il lavoro, metto la borsa da palestra in auto"',
      ],
    },
    {
      id: 4, tipo: 'contenuto',
      titolo: 'Design dell\'Ambiente Fisico',
      testo: "Non fare affidamento sulla forza di volontà. Progetta l'ambiente in modo che il comportamento corretto sia quello più facile.",
      narrazio: "La forza di volontà è una risorsa limitata. Si esaurisce nel corso della giornata. Le persone che sembrano avere una volontà di ferro in realtà hanno semplicemente progettato il loro ambiente in modo da non doverla usare spesso.",
      icona: '🏠',
      punti: [
        'Tieni le scarpe da corsa vicino alla porta — non nasconderle nell\'armadio',
        'Prepara la borsa da palestra la sera prima',
        'Metti la frutta sul bancone, le cose poco salutari fuori dalla vista',
        'Dormi con i vestiti da allenamento già pronti per il mattino',
      ],
    },
    {
      id: 5, tipo: 'esercizio',
      titolo: 'Esercizio Pratico',
      testo: 'Tre esercizi concreti per iniziare a costruire le tue abitudini fitness.',
      narrazio: 'Questi esercizi sono fondamentali. Non sono opzionali. Saltarli significa perdere la parte più importante della lezione.',
      icona: '✍️',
      punti: [
        '1. Mappa le tue abitudini attuali: mattina, pomeriggio, sera',
        '2. Progetta la tua routine mattutina usando l\'habit stacking',
        '3. Identifica 3 trigger negativi e pianifica come neutralizzarli',
      ],
    },
    {
      id: 6, tipo: 'recap',
      titolo: 'Recap Lezione 1.3',
      testo: 'Ora sai come funziona il cervello. Nella prossima lezione imparerai cosa fare quando smette di funzionare come vorresti.',
      narrazio: 'Hai capito la meccanica delle abitudini. Nella prossima e ultima lezione del modulo 1, affronteremo i pattern mentali sabotatori — quelli che ti fanno mollare anche quando sai cosa fare.',
      icona: '✅',
      punti: [
        'Il ciclo Segnale-Routine-Ricompensa governa ogni abitudine',
        "L'habit stacking aggancia nuovi comportamenti a quelli esistenti",
        "Il design dell'ambiente riduce la necessità di forza di volontà",
        'Hai mappato le tue abitudini e progettato la routine mattutina',
      ],
    },
  ],
}

const lezione_1_4: LezioneSlides = {
  lezioneNum: '1.4',
  titolo: 'Superare gli Ostacoli Mentali',
  audioBasePath: 'corso-audio/1-4',
  slides: [
    {
      id: 1, tipo: 'intro',
      titolo: 'Lezione 1.4',
      testo: 'Superare gli Ostacoli Mentali',
      narrazio: 'Questa è l\'ultima lezione del Modulo 1. Abbiamo parlato di perché, di obiettivi, di abitudini. Ora affrontiamo il vero nemico: il sabotatore interno. Quella voce che dice "non ce la fai", "non è il momento", "inizia lunedì".',
      icona: '🧗',
      highlight: 'Il problema non è che non sai cosa fare. È che non fai quello che sai.',
    },
    {
      id: 2, tipo: 'lista',
      titolo: 'I 5 Pattern Sabotatori',
      testo: "Questi sono i cinque schemi mentali che bloccano quasi tutti. Riconoscerli è il primo passo.",
      narrazio: 'Tutti e cinque questi pattern hanno una cosa in comune: sembrano ragionevoli nel momento in cui li pensi. Il tuo cervello li giustifica perfettamente. Ma sono tutti meccanismi di evitamento.',
      icona: '⚠️',
      punti: [
        '1. Il tutto o niente: "Ho saltato un giorno, tanto ho rovinato tutto"',
        '2. La perfezione: "Non ho le condizioni ideali, aspetto"',
        '3. L\'identità negativa: "Non sono il tipo da palestra"',
        '4. La catastrofizzazione: "Se fallisco ancora mi confermo di essere incapace"',
        '5. Il procrastinamento: "Inizio lunedì, dopo le ferie, a settembre"',
      ],
    },
    {
      id: 3, tipo: 'contenuto',
      titolo: 'La Tecnica Se...Allora',
      testo: 'Prepara in anticipo la tua risposta per i momenti difficili. Il momento di crisi non è il momento giusto per decidere.',
      narrazio: 'La tecnica se-allora è semplice e scientificamente validata. Funziona così: identifichi in anticipo le situazioni difficili e pianifichi esattamente cosa farai in quelle situazioni.',
      icona: '🔧',
      highlight: '"SE succede X, ALLORA io faccio Y"',
      punti: [
        '"Se sono troppo stanco per allenarmi, allora faccio 10 minuti invece di 45"',
        '"Se salto un allenamento, allora il giorno dopo non salto"',
        '"Se mangio male a pranzo, allora la cena è normale — non compensa"',
      ],
    },
    {
      id: 4, tipo: 'contenuto',
      titolo: 'I Fallimenti come Dati',
      testo: 'Ogni volta che molli, ogni volta che sbagli, stai raccogliendo informazioni preziose — se sai come leggerle.',
      narrazio: "I fallimenti non sono il contrario del successo. Sono parte del processo. Il problema non è fallire — è interpretare il fallimento come prova della propria incapacità invece che come feedback su cosa migliorare.",
      icona: '📊',
      highlight: 'Non hai fallito. Hai trovato un modo che non funziona. Ora ne provi un altro.',
    },
    {
      id: 5, tipo: 'esercizio',
      titolo: 'Esercizio Pratico',
      testo: 'Tre esercizi per costruire il tuo sistema anti-sabotaggio personale.',
      narrazio: 'Questi tre esercizi insieme formano il tuo piano anti-sabotaggio. È il documento che apri quando stai per mollare.',
      icona: '✍️',
      punti: [
        '1. Analizza i tuoi ultimi 3 tentativi falliti: cosa è successo esattamente?',
        '2. Scrivi il tuo piano se-allora per i 5 scenari difficili più probabili',
        '3. Riscrivi le 3 frasi limitanti più frequenti in versione potenziante',
      ],
    },
    {
      id: 6, tipo: 'recap',
      titolo: 'Hai completato il Modulo 1! 🎉',
      testo: 'Le fondamenta psicologiche sono solide. Ora costruiamo sopra.',
      narrazio: 'Complimenti. Hai completato il Modulo 1. Hai il tuo perché, il tuo piano, le tue abitudini e il tuo sistema anti-sabotaggio. Tra 7 giorni si sblocca il Modulo 2: Alimentazione per il Successo.',
      icona: '🏆',
      punti: [
        'I 5 pattern sabotatori — ora li riconosci prima che agiscano',
        'La tecnica se-allora prepara la risposta prima della crisi',
        'I fallimenti sono dati, non verdetti',
        'Modulo 2 disponibile tra 7 giorni: Alimentazione per il Successo',
      ],
      highlight: 'Nel frattempo: applica quello che hai imparato. La teoria senza azione non vale nulla.',
    },
  ],
}

// ─────────────────────────────────────────────
// REGISTRY — mappa lezioneNum → slides
// Aggiungi qui le altre lezioni man mano
// ─────────────────────────────────────────────

export const LEZIONI_SLIDES: Record<string, LezioneSlides> = {
  '1.1': lezione_1_1,
  '1.2': lezione_1_2,
  '1.3': lezione_1_3,
  '1.4': lezione_1_4,
  // '2.1': lezione_2_1,  ← aggiungi man mano
}

// Helper: testo completo di una lezione per ElevenLabs
export function getTestoPerElevenLabs(lezioneNum: string): string {
  const lezione = LEZIONI_SLIDES[lezioneNum]
  if (!lezione) return ''
  return lezione.slides
    .map(s => `[Slide ${s.id}]\n${s.narrazio}`)
    .join('\n\n')
}
