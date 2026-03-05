// lib/corso-data.ts

export interface Lezione {
  num: string
  title: string
  duration: string
  desc: string
  learn: string[]
  exercises: string[]
  worksheet: string
  pdfFile: string // filename in /public/corso/
}

export interface Modulo {
  num: number
  title: string
  subtitle: string
  color: string
  lessons: Lezione[]
}

export const MODULI: Modulo[] = [
  {
    num: 1,
    title: 'Motivazione e Mentalita',
    subtitle: 'Le fondamenta psicologiche della trasformazione',
    color: '#E8450A',
    lessons: [
      {
        num: '1.1', title: 'Trova il Tuo Vero Perche', duration: '35-40 min',
        desc: 'La motivazione superficiale dura settimane. Quella profonda dura anni. Esplori i 4 livelli di motivazione e costruisci il tuo perche personale.',
        learn: ['I 4 livelli di motivazione', 'Come identificare il tuo perche profondo', 'Perche la motivazione da sola non basta'],
        exercises: ['Esercizio dei 5 Perche', 'Lettera al tuo io futuro', 'Mappa dei valori personali'],
        worksheet: 'Il mio Perche — documento personale',
        pdfFile: 'modulo1_motivazione_mentalita.pdf',
      },
      {
        num: '1.2', title: "Obiettivi SMART e Piano d'Azione", duration: '40-45 min',
        desc: "Trasformi i tuoi desideri in obiettivi concreti, misurabili e temporizzati con un piano d'azione realistico.",
        learn: ['Framework SMART applicato al fitness', 'Micro-obiettivi settimanali', 'Gestire aspettative e impazienza'],
        exercises: ["3 obiettivi SMART personali", "Piano d'azione 12 settimane", "Identificazione ostacoli"],
        worksheet: 'Piano Obiettivi 12 Settimane',
        pdfFile: 'modulo1_motivazione_mentalita.pdf',
      },
      {
        num: '1.3', title: 'La Scienza delle Abitudini', duration: '35-40 min',
        desc: "Capisci il ciclo neurologico Segnale-Routine-Ricompensa e installa nuove routine fitness in modo quasi automatico.",
        learn: ['Il ciclo Segnale-Routine-Ricompensa', 'Habit stacking', "Design dell'ambiente fisico"],
        exercises: ['Mappa abitudini attuali', 'Design routine mattutina', 'Trigger negativi'],
        worksheet: 'Tracker Abitudini 30 Giorni',
        pdfFile: 'modulo1_motivazione_mentalita.pdf',
      },
      {
        num: '1.4', title: 'Superare gli Ostacoli Mentali', duration: '40-45 min',
        desc: "Affronti i pattern mentali sabotatori e costruisci un sistema di risposta pratico per i momenti di crisi.",
        learn: ['I 5 pattern sabotatori piu comuni', 'Tecnica se...allora', 'Fallimenti come dati utili'],
        exercises: ['Analisi fallimenti passati', 'Piano risposta momenti difficili', 'Riscrivi le frasi limitanti'],
        worksheet: 'Piano Anti-Sabotaggio',
        pdfFile: 'modulo1_motivazione_mentalita.pdf',
      },
    ],
  },
  {
    num: 2,
    title: 'Alimentazione per il Successo',
    subtitle: 'Nutrizione pratica, sostenibile e senza ossessioni',
    color: '#E8450A',
    lessons: [
      {
        num: '2.1', title: 'I Fondamentali della Nutrizione', duration: '35-40 min',
        desc: 'Capisci come funziona il cibo nel tuo corpo: macronutrienti in modo pratico, non biochimica teorica.',
        learn: ['Ruolo di ogni macronutriente', 'Quante proteine servono davvero', 'Grassi buoni vs da limitare'],
        exercises: ['Analisi piatto medio attuale', 'Calcolo fabbisogno proteico', 'Carboidrati raffinati'],
        worksheet: 'Diario Alimentare 3 Giorni',
        pdfFile: 'modulo2_alimentazione.pdf',
      },
      {
        num: '2.2', title: 'Piani Alimentari per Ogni Obiettivo', duration: '45-50 min',
        desc: 'Costruisci il tuo piano alimentare personalizzato con un sistema flessibile che si adatta alla tua settimana reale.',
        learn: ['Deficit calorico sostenibile', 'Surplus controllato per la massa', 'Timing dei pasti'],
        exercises: ['Piano settimanale', 'Simulazione settimana tipo', 'Pasti fuori casa'],
        worksheet: 'Piano Alimentare Settimanale',
        pdfFile: 'modulo2_alimentazione.pdf',
      },
      {
        num: '2.3', title: 'Meal Prep: Preparazione Strategica', duration: '40-45 min',
        desc: 'Organizzi la tua domenica per avere pasti pronti 3-4 giorni, azzerando le decisioni impulsive.',
        learn: ['Batch cooking efficiente', 'Conservazione alimenti', 'Pasti versatili senza annoiarsi'],
        exercises: ['Prima sessione meal prep', 'Lista spesa ottimizzata', '5 combinazioni stessi ingredienti'],
        worksheet: 'Planner Meal Prep + Lista Spesa',
        pdfFile: 'modulo2_alimentazione.pdf',
      },
      {
        num: '2.4', title: 'Idratazione, Integratori e Miti', duration: '35-40 min',
        desc: "L'acqua migliora le performance del 10-20%. Scopri quali integratori funzionano davvero e sfata i 5 miti piu dannosi.",
        learn: ['Quando e quanto bere', 'Integratori evidence-based vs marketing', '5 miti alimentari dannosi'],
        exercises: ['Fabbisogno idrico personale', 'Valuta integratori attuali', 'Identifica miti creduti veri'],
        worksheet: 'Tracker Idratazione 7 Giorni',
        pdfFile: 'modulo2_alimentazione.pdf',
      },
    ],
  },
  {
    num: 3,
    title: 'Il Piano di Allenamento',
    subtitle: 'Schede complete, progressive e adattabili',
    color: '#E8450A',
    lessons: [
      {
        num: '3.1', title: 'Scegli il Piano per il Tuo Obiettivo', duration: '35-40 min',
        desc: 'Capisci volume, intensita e frequenza. Scegli il piano giusto per te con un sistema di valutazione guidato.',
        learn: ['Volume, intensita, frequenza', 'Forza vs ipertrofia vs dimagrimento', 'Valuta il tuo livello'],
        exercises: ['Test fitness iniziale', 'Scelta piano', 'Giorni di allenamento'],
        worksheet: 'Test Fitness Iniziale',
        pdfFile: 'modulo3_allenamento.pdf',
      },
      {
        num: '3.2', title: 'Schede Dimagrimento e Tonificazione', duration: '45-50 min',
        desc: 'Schede complete Full Body + HIIT e Split 3 giorni per palestra e casa, con tecnica e progressioni.',
        learn: ['Tecnica movimenti fondamentali', 'HIIT senza sovrallenare', 'Progressioni settimanali'],
        exercises: ['Prima sessione guidata', 'Log carichi e ripetizioni', 'Autovalutazione tecnica'],
        worksheet: 'Scheda Allenamento Settimanale',
        pdfFile: 'modulo3_allenamento.pdf',
      },
      {
        num: '3.3', title: 'Schede Massa Muscolare e Over 60', duration: '45-50 min',
        desc: 'Schede split per la massa muscolare e programma specifico over 60 con focus su sicurezza articolare.',
        learn: ["Principi dell'ipertrofia", 'Progressione carichi', 'Adattamenti over 60'],
        exercises: ['Prima sessione split', 'Test forza baseline', 'Riscaldamento specifico'],
        worksheet: 'Diario Allenamento Split',
        pdfFile: 'modulo3_allenamento.pdf',
      },
      {
        num: '3.4', title: 'Recupero, Mobilita e Prevenzione', duration: '35-40 min',
        desc: 'Il recupero e parte del programma. Routine mobilita 10 min, recupero attivo e prevenzione infortuni.',
        learn: ['Dolore muscolare vs articolare', 'Recupero attivo vs passivo', 'Routine mobilita'],
        exercises: ['Routine mobilita subito', 'Segnali di recupero', 'Piano recupero post-sessione'],
        worksheet: 'Routine Mobilita Giornaliera',
        pdfFile: 'modulo3_allenamento.pdf',
      },
    ],
  },
  {
    num: 4,
    title: 'La Sfida dei 30 Giorni',
    subtitle: 'Il sistema per costruire costanza e risultati',
    color: '#E8450A',
    lessons: [
      {
        num: '4.1', title: 'Come Funziona la Sfida', duration: '30-35 min',
        desc: 'Capisci la psicologia del commitment e perche le sfide a tempo determinato funzionano meglio degli obiettivi aperti.',
        learn: ['Psicologia del commitment', 'Piccole vittorie e momentum', 'Struttura progressiva'],
        exercises: ['Contratto con te stesso', 'Accountability partner', 'Prepara lo spazio fisico'],
        worksheet: 'Contratto con Me Stesso',
        pdfFile: 'modulo4_sfida30giorni.pdf',
      },
      {
        num: '4.2', title: 'Settimana 1 e 2 — Le Fondamenta', duration: '40-45 min',
        desc: 'Guida giorno per giorno per i primi 14 giorni critici: cosa fare, come gestire i momenti di dubbio.',
        learn: ['Gestire resistenza iniziale', 'Segnali di progresso invisibili', 'Routine serale'],
        exercises: ['Log giorni 1-14', 'Check-in Giorno 7', 'Aggiusta il piano'],
        worksheet: 'Diario Giorni 1-14',
        pdfFile: 'modulo4_sfida30giorni.pdf',
      },
      {
        num: '4.3', title: 'Settimana 3 e 4 — Aumenta', duration: '40-45 min',
        desc: 'Come aumentare intensita in modo intelligente e prepararti per il rush finale senza fermarti.',
        learn: ['Aumentare intensita senza sovrallenare', 'Spezzare la noia', 'Rush finale'],
        exercises: ['Log giorni 15-30', 'Mid-check con Giorno 1', 'Pianifica il Giorno 30'],
        worksheet: 'Diario Giorni 15-30',
        pdfFile: 'modulo4_sfida30giorni.pdf',
      },
      {
        num: '4.4', title: 'Giorno 30: Misura e Pianifica', duration: '35-40 min',
        desc: 'Il Giorno 30 non e la fine. Misuri i risultati, interpreti i dati e costruisci il mese successivo.',
        learn: ['Indicatori oltre la bilancia', 'Costruire il mese 2', 'Mantenimento vs progressione'],
        exercises: ['Test fitness Giorno 30', 'Analisi progressi', "Piano 30 giorni successivi"],
        worksheet: 'Report Finale 30 Giorni',
        pdfFile: 'modulo4_sfida30giorni.pdf',
      },
    ],
  },
  {
    num: 5,
    title: 'Strumenti e Monitoraggio',
    subtitle: 'Misura, adatta e costruisci il lungo termine',
    color: '#E8450A',
    lessons: [
      {
        num: '5.1', title: 'Le Metriche che Contano', duration: '30-35 min',
        desc: 'Il peso e solo uno dei 10 indicatori. Costruisci un sistema di misurazione che ti dia informazioni reali.',
        learn: ['10 indicatori di progresso', 'Quando e come pesarsi', 'Misurazioni corporee'],
        exercises: ['Baseline completa', '3-4 metriche personali', 'Protocollo settimanale'],
        worksheet: 'Scheda Monitoraggio 12 Settimane',
        pdfFile: 'modulo5_strumenti.pdf',
      },
      {
        num: '5.2', title: 'App e Strumenti Digitali', duration: '30-35 min',
        desc: 'Le migliori app per allenamento e nutrizione e come integrarle senza che diventino stress.',
        learn: ['Strong vs Nike TC vs Freeletics', 'MyFitnessPal vs Yazio', 'App senza dipendenza'],
        exercises: ['Configura app allenamento', 'Profilo nutrizionale', 'Dashboard personale'],
        worksheet: 'Setup Digitale Personale',
        pdfFile: 'modulo5_strumenti.pdf',
      },
      {
        num: '5.3', title: 'Adattare il Programma nel Tempo', duration: '35-40 min',
        desc: 'Il corpo si adatta. Impari a leggere i segnali di stallo e modificare il programma in modo intelligente.',
        learn: ['Segnali di stallo', 'Quando cambiare programma', 'Settimane difficili'],
        exercises: ['Analisi dati 4 settimane', 'Punti di stallo', 'Piano B'],
        worksheet: 'Piano di Adattamento',
        pdfFile: 'modulo5_strumenti.pdf',
      },
      {
        num: '5.4', title: 'Percorso a Lungo Termine', duration: '35-40 min',
        desc: "Il vero obiettivo e uno stile di vita sostenibile. Costruisci il tuo piano personale per i prossimi 6 mesi.",
        learn: ['Trasformazione vs mantenimento', 'Programma 6 mesi autonomo', 'Quando serve un coach'],
        exercises: ['Sintesi percorso', "Piano 3 mesi", 'Valuta il coaching'],
        worksheet: 'Piano a Lungo Termine 6 Mesi',
        pdfFile: 'modulo5_strumenti.pdf',
      },
    ],
  },
]

// Calcola quali moduli sono sbloccati in base alla data di acquisto
export function getModuliSbloccati(acquistatoAt: string): number[] {
  const acquisto = new Date(acquistatoAt)
  const oggi = new Date()
  const giorniPassati = Math.floor((oggi.getTime() - acquisto.getTime()) / (1000 * 60 * 60 * 24))

  const sbloccati: number[] = []
  if (giorniPassati >= 0)  sbloccati.push(1)  // subito
  if (giorniPassati >= 7)  sbloccati.push(2)  // settimana 1
  if (giorniPassati >= 14) sbloccati.push(3)  // settimana 2
  if (giorniPassati >= 21) sbloccati.push(4)  // settimana 3
  if (giorniPassati >= 28) sbloccati.push(5)  // settimana 4
  return sbloccati
}

export function getGiorniAlProssimoModulo(acquistatoAt: string, moduloNum: number): number {
  const acquisto = new Date(acquistatoAt)
  const oggi = new Date()
  const giorniPassati = Math.floor((oggi.getTime() - acquisto.getTime()) / (1000 * 60 * 60 * 24))
  const giorniNecessari = (moduloNum - 1) * 7
  return Math.max(0, giorniNecessari - giorniPassati)
}
