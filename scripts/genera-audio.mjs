// scripts/genera-audio.mjs
// E:\tornoinforma-landing\scripts\genera-audio.mjs
//
// Esegui con:
//   node scripts/genera-audio.mjs

import { createClient } from '@supabase/supabase-js'

const ELEVENLABS_API_KEY  = 'sk_2dd1ca359cb6989a851fabcfe710aa5b7cd18b29d9dded72'
const ELEVENLABS_VOICE_ID = 'PSp7S6ST9fDNXDwEzX0m'
const SUPABASE_URL        = 'https://vzwplpljxdqmdejvzwuw.supabase.co'
const SUPABASE_KEY        = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6d3BscGxqeGRxbWRlanZ6d3V3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQ0MjY0MiwiZXhwIjoyMDg3MDE4NjQyfQ.yuwJOxh5jUcPP-nUNcI2_ewLXkzOoF1hmI4AH6UO4OA'
const BUCKET              = 'corso-audio'
const DELAY_MS            = 1200

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const LEZIONI = {

  // ── MODULO 1 (già generato — saltato automaticamente se esiste) ────────────
  '1.1': { slides: [
    { id: 1, narrazio: 'Benvenuto nella prima lezione del corso Torno in Forma. Oggi parleremo di motivazione. Non della motivazione superficiale che ti fa iscrivere in palestra a gennaio e smettere a febbraio. Della motivazione profonda, quella che resiste nei momenti difficili.' },
    { id: 2, narrazio: 'Esistono quattro livelli di motivazione, e quasi tutti si fermano al primo livello, che è anche il più fragile. Vediamoli insieme.' },
    { id: 3, narrazio: 'Friedrich Nietzsche diceva: chi ha un perché abbastanza forte sopporta qualsiasi come. Nel fitness questo significa che non è il piano di allenamento a fare la differenza. È la chiarezza sul perché lo stai facendo.' },
    { id: 4, narrazio: 'La tecnica dei cinque perché funziona così: prendi la tua motivazione superficiale e chiediti perché ti importa. Poi chiediti perché di nuovo. E ancora. E ancora. E ancora. Al quinto livello trovi quasi sempre qualcosa di molto più personale e potente.' },
    { id: 5, narrazio: 'Ecco la verità scomoda: la motivazione è sopravvalutata. È utile per iniziare, ma non puoi fare affidamento su di essa ogni giorno. Ci sono giorni in cui non hai voglia, in cui sei stanco, in cui la vita interferisce. Quei giorni hanno bisogno di sistemi, non di motivazione.' },
    { id: 6, narrazio: 'Ora è il momento di fermarsi e fare il lavoro. Apri il worksheet della lezione. Hai tre esercizi da completare prima di passare alla prossima lezione.' },
    { id: 7, narrazio: 'Ottimo lavoro. Facciamo un rapido riassunto di quello che hai imparato oggi. Esistono quattro livelli di motivazione e devi puntare al terzo e al quarto. La tecnica dei cinque perché ti aiuta a scavare in profondità. La motivazione da sola non basta, servono sistemi. Prossima lezione: Obiettivi SMART e Piano di Azione.' },
  ]},
  '1.2': { slides: [
    { id: 1, narrazio: "Nella lezione precedente hai trovato il tuo perché. Ora trasformiamo quel perché in obiettivi concreti e misurabili. Un sogno senza un piano è solo un desiderio." },
    { id: 2, narrazio: 'SMART sta per Specifico, Misurabile, Raggiungibile, Rilevante e Temporizzato. Vediamo come applicarlo al fitness in modo concreto, non teorico.' },
    { id: 3, narrazio: "Il problema con gli obiettivi a lungo termine è che sembrano lontani. Quando sono lontani, non motivano abbastanza nel quotidiano. La soluzione è dividere l'obiettivo principale in micro-obiettivi settimanali. Ogni settimana vinci una piccola battaglia." },
    { id: 4, narrazio: "L'impazienza è il nemico numero uno dei risultati. Il corpo ha i suoi tempi biologici. Non puoi accelerarli oltre un certo punto senza rischiare. Ma puoi imparare a trovare soddisfazione nel processo, non solo nel risultato." },
    { id: 5, narrazio: "Apri il worksheet. Hai tre esercizi concreti che ti guideranno nella creazione del tuo piano personale." },
    { id: 6, narrazio: "Nella prossima lezione entreremo nella neurologia delle abitudini. Capirai perché certi comportamenti si attivano automaticamente e come sfruttare questo meccanismo a tuo favore." },
  ]},
  '1.3': { slides: [
    { id: 1, narrazio: "Il 40% di quello che fai ogni giorno non è una decisione consapevole. È un'abitudine. Il tuo cervello ha automatizzato quei comportamenti per risparmiare energia. Oggi impari a sfruttare questo meccanismo." },
    { id: 2, narrazio: "Charles Duhigg nel suo libro Il potere delle abitudini ha descritto il ciclo che governa tutti i nostri comportamenti automatici. Si chiama ciclo abitudinario ed è composto da tre elementi: il segnale, la routine e la ricompensa." },
    { id: 3, narrazio: "L'habit stacking, o catena di abitudini, funziona così: identifichi un'abitudine che fai già ogni giorno e agganci la nuova abitudine fitness subito prima o dopo." },
    { id: 4, narrazio: "La forza di volontà è una risorsa limitata. Si esaurisce nel corso della giornata. Le persone che sembrano avere una volontà di ferro in realtà hanno semplicemente progettato il loro ambiente in modo da non doverla usare spesso." },
    { id: 5, narrazio: "Questi esercizi sono fondamentali. Non sono opzionali. Saltarli significa perdere la parte più importante della lezione." },
    { id: 6, narrazio: "Hai capito la meccanica delle abitudini. Nella prossima e ultima lezione del modulo 1, affronteremo i pattern mentali sabotatori, quelli che ti fanno mollare anche quando sai cosa fare." },
  ]},
  '1.4': { slides: [
    { id: 1, narrazio: "Questa è l'ultima lezione del Modulo 1. Abbiamo parlato di perché, di obiettivi, di abitudini. Ora affrontiamo il vero nemico: il sabotatore interno. Quella voce che dice non ce la fai, non è il momento, inizia lunedì." },
    { id: 2, narrazio: "Tutti e cinque questi pattern hanno una cosa in comune: sembrano ragionevoli nel momento in cui li pensi. Il tuo cervello li giustifica perfettamente. Ma sono tutti meccanismi di evitamento." },
    { id: 3, narrazio: "La tecnica se-allora è semplice e scientificamente validata. Identifichi in anticipo le situazioni difficili e pianifichi esattamente cosa farai in quelle situazioni." },
    { id: 4, narrazio: "I fallimenti non sono il contrario del successo. Sono parte del processo. Il problema non è fallire, è interpretare il fallimento come prova della propria incapacità invece che come feedback su cosa migliorare." },
    { id: 5, narrazio: "Questi tre esercizi insieme formano il tuo piano anti-sabotaggio. È il documento che apri quando stai per mollare." },
    { id: 6, narrazio: "Complimenti. Hai completato il Modulo 1. Hai il tuo perché, il tuo piano, le tue abitudini e il tuo sistema anti-sabotaggio. Il Modulo 2 Alimentazione per il Successo si sblocca tra 7 giorni." },
  ]},

  // ── MODULO 2 — ALIMENTAZIONE ───────────────────────────────────────────────
  '2.1': { slides: [
    { id: 1, narrazio: "Benvenuto nel Modulo 2. La nutrizione è il fondamento di qualsiasi trasformazione fisica. Puoi allenarti ogni giorno, ma se non capisci cosa stai mettendo nel corpo, i progressi saranno lenti e difficili da mantenere. Questa lezione non ti chiede di diventare un nutrizionista: ti chiede di smettere di mangiare al buio." },
    { id: 2, narrazio: "Il tuo corpo usa tre grandi categorie di nutrienti per funzionare. I carboidrati sono la fonte primaria di energia per cervello e muscoli. Le proteine costruiscono il muscolo, riparano i tessuti e danno sazietà. I grassi sani sono essenziali per gli ormoni, il cervello e l'assorbimento delle vitamine. Il problema non è mai un singolo macronutriente: è la proporzione sbagliata rispetto ai tuoi obiettivi." },
    { id: 3, narrazio: "I carboidrati complessi come riso integrale, quinoa, avena e patate dolci rilasciano energia gradualmente e tengono sazi più a lungo. I carboidrati semplici come zucchero, pane bianco e dolci creano un picco glicemico e poi un crollo di energia. Regola pratica: se è integrale o viene dalla terra, è probabilmente una buona scelta." },
    { id: 4, narrazio: "Il corpo è composto per circa il 60% da acqua. Una disidratazione anche solo del 2% riduce le performance cognitive del 10-15% e quelle fisiche del 20-30%. Il fabbisogno base è di 30-35 millilitri per kg di peso corporeo. L'indicatore pratico più semplice: urina giallo pallido significa che sei ben idratato." },
    { id: 5, narrazio: "Fermati e rispondi nel worksheet: sai quanti grammi di proteine mangi in media al giorno? Stai bevendo abbastanza acqua? Qual è il tuo pasto più squilibrato? Queste risposte sono la tua baseline di partenza." },
    { id: 6, narrazio: "Nella prossima lezione passiamo alla pratica: come calcolare le calorie senza diventare ossessivo, come usare i macronutrienti per il tuo obiettivo specifico, e come leggere le etichette alimentari." },
  ]},
  '2.2': { slides: [
    { id: 1, narrazio: "Sapere cosa sono i macronutrienti è una cosa. Sapere come usarli per il tuo obiettivo specifico è un'altra. In questa lezione passiamo dalla teoria all'applicazione pratica. Le calorie contano. Ma ossessionarsi con i numeri è il modo più veloce per abbandonare qualsiasi piano alimentare. Impara a contarle, poi impara a non aver più bisogno di contarle." },
    { id: 2, narrazio: "Il principio del peso corporeo è semplice: deficit calorico di 300-500 calorie al giorno porta a una perdita di 0.3-0.5 kg a settimana, che è il ritmo ottimale. Non scendere mai sotto 1200 calorie per le donne o 1500 per gli uomini: rallenta il metabolismo. Mantieni le proteine alte a 2 grammi per kg: è l'unico modo per preservare il muscolo mentre perdi grasso." },
    { id: 3, narrazio: "Per calcolare il tuo fabbisogno usa la formula del metabolismo basale. Per gli uomini: 88.4 più 13.4 per il peso in kg più 4.8 per l'altezza in cm meno 5.7 per l'età. Poi moltiplica per il tuo fattore di attività. Se ti alleni moderatamente 3-5 volte a settimana, moltiplica per 1.55." },
    { id: 4, narrazio: "Le etichette nutrizionali sono uno strumento potente che quasi nessuno usa correttamente. Il trucco più usato è la dimensione della porzione. Un pacco da 200 grammi con valori dichiarati per 25 grammi di porzione: moltiplica tutto per 8 per avere i valori reali. Controlla sempre prima la dimensione della porzione, poi le calorie, le proteine e gli zuccheri aggiunti." },
    { id: 5, narrazio: "Completa il worksheet: calcola il tuo metabolismo basale e il tuo fabbisogno calorico totale. Poi definisci i grammi giornalieri di proteine, carboidrati e grassi in base al tuo obiettivo specifico." },
    { id: 6, narrazio: "Ora sai come calcolare il tuo fabbisogno e come leggere le etichette. Nella prossima lezione costruiamo il piano alimentare pratico con il meal prep." },
  ]},
  '2.3': { slides: [
    { id: 1, narrazio: "La differenza tra chi ottiene risultati duraturi e chi no non è la dieta più restrittiva. È la capacità di pianificare in anticipo. Fallire nel pianificare significa pianificare il fallimento. Quando sei stanco e affamato il tuo cervello sceglierà sempre l'opzione più facile e disponibile. Rendila sana." },
    { id: 2, narrazio: "Il meal prep ti fa risparmiare 3-5 ore settimanali rispetto a cucinare ogni sera. Elimina lo stress decisionale: non devi pensare cosa mangio a stomaco vuoto e stanco. Ti dà controllo preciso dei macronutrienti. E ti fa risparmiare denaro perché eviti acquisti impulsivi e sprechi alimentari." },
    { id: 3, narrazio: "Una sessione tipo di meal prep domenicale di due ore e mezza copre: 500 grammi di petto di pollo grigliato, 6 uova sode e 400 grammi di ceci lessati come proteine. 300 grammi di riso integrale cotto e 4 patate dolci al forno come carboidrati. Una teglia di verdure miste al forno più broccoli al vapore. E colazioni di porridge freddo in barattoli per 3 giorni." },
    { id: 4, narrazio: "I miti alimentari da sfatare. I grassi fanno ingrassare: falso, fa ingrassare il surplus calorico totale. I carboidrati la sera fanno ingrassare: falso, ciò che conta è il bilancio calorico totale della giornata. Mangiare ogni 2-3 ore accelera il metabolismo: falso, la frequenza dei pasti non influenza significativamente il metabolismo." },
    { id: 5, narrazio: "Costruisci nel worksheet il tuo piano alimentare settimanale completo: colazione, pranzo e cena per ogni giorno della settimana. Poi pianifica la tua prima sessione di meal prep con la lista della spesa." },
    { id: 6, narrazio: "Nell'ultima lezione del modulo affrontiamo la situazione che manda in crisi la maggior parte delle persone: i pasti al ristorante, il fast food e la gestione delle situazioni sociali." },
  ]},
  '2.4': { slides: [
    { id: 1, narrazio: "Uno dei motivi principali per cui le persone abbandonano il piano alimentare non è la mancanza di disciplina: è la rigidità. Un piano che non sopravvive a una cena al ristorante non è un piano sostenibile. La perfezione è nemica del progresso. Un pasto fuori piano non rovina settimane di lavoro. Rinunciare dopo un pasto fuori piano, quello sì." },
    { id: 2, narrazio: "La regola dell'80/20: mangia in modo consapevole per l'80% dei pasti, e lascia il 20% per la flessibilità. Questo significa 17 pasti bilanciati e 4 pasti flessibili ogni settimana. I 4 pasti flessibili non sono sgarri da cui sentirti in colpa: sono parte del piano. Un pasto al ristorante il venerdì sera non compromette i progressi se gli altri 17 sono stati solidi." },
    { id: 3, narrazio: "Al ristorante: guarda il menu online in anticipo e decidi prima di arrivare affamato. Punta su proteine magre come pesce alla griglia, pollo o bistecca magra. Chiedi i condimenti a parte: il 40-50% delle calorie extra arriva dai condimenti. Preferisci cotture semplici come griglia, forno e vapore rispetto a fritti e impanati." },
    { id: 4, narrazio: "La fame emotiva è un pattern che molte persone non riconoscono. La fame fisica aumenta gradualmente e si accontenta di qualsiasi cibo. La fame emotiva arriva all'improvviso, vuole comfort food specifici, e non si attenua davvero con la sazietà. Il test dei 10 minuti: aspetta 10 minuti e bevi un bicchiere d'acqua. Se era emotiva, passa. Se era fisica, rimane." },
    { id: 5, narrazio: "Dopo un pasto fuori piano: non punire il giorno dopo con digiuno o allenamento estremo, perché crea un ciclo negativo. Torna al piano normale al pasto successivo. Senza dramma, senza ricomincio da lunedì. Analizza senza giudizio: cosa ha funzionato? Cosa faresti diversamente la prossima volta?" },
    { id: 6, narrazio: "Hai completato il Modulo 2. Conosci i macronutrienti, sai calcolare il tuo fabbisogno, padroneggi il meal prep e gestisci i pasti fuori con flessibilità intelligente. Il Modulo 3, Il Piano di Allenamento, si sblocca tra 7 giorni." },
  ]},

  // ── MODULO 3 — ALLENAMENTO ─────────────────────────────────────────────────
  '3.1': { slides: [
    { id: 1, narrazio: "L'errore più comune nel fitness è iniziare ad allenarsi senza una strategia. Si va in palestra, si fa un po' di tutto, ci si stanca, e poi dopo 3 settimane si smette. Il problema non è la mancanza di motivazione: è la mancanza di un piano adatto al proprio obiettivo. Il miglior allenamento non è il più duro o il più lungo. È quello che puoi fare con costanza, settimana dopo settimana, per mesi." },
    { id: 2, narrazio: "Un piano completo include quattro componenti. Il cardio per la salute cardiovascolare, 2-4 volte a settimana. La forza per costruire muscolo e migliorare il metabolismo, 2-4 volte a settimana. La flessibilità e mobilità per prevenire infortuni, ogni giorno per 5-15 minuti. E il recupero, che è fondamentale quanto l'allenamento stesso." },
    { id: 3, narrazio: "Per il dimagrimento combina cardio HIIT 2-3 volte con forza 3 volte a settimana: il muscolo brucia più calorie a riposo. Per la massa muscolare: priorità alla forza 4-5 volte, cardio moderato 1-2 volte. Per la tonicità: forza con carichi medi e alte ripetizioni più cardio moderato. Per la salute generale e over 60: forza funzionale leggera più cardio a bassa intensità e mobilità quotidiana." },
    { id: 4, narrazio: "Il corpo si adatta. Se fai sempre lo stesso allenamento, smette di rispondere dopo 4-6 settimane. La progressione progressiva garantisce continui miglioramenti: aumenta il peso del 2.5-5% quando riesci a completare tutte le serie con buona tecnica, aggiungi una serie ogni 2-3 settimane, o riduci i tempi di recupero." },
    { id: 5, narrazio: "Prima di iniziare, esegui il test fitness per capire il tuo punto di partenza: flessioni, squat a corpo libero, plank, resistenza cardiovascolare e flessibilità. Ripetilo ogni 4 settimane per misurare i progressi in modo oggettivo." },
    { id: 6, narrazio: "Completa il worksheet: definisci il tuo obiettivo primario, quante sessioni settimanali puoi fare realisticamente, e costruisci la struttura della tua settimana tipo. Nella prossima lezione approfondiamo cardio LISS, HIIT, forza e mobilità." },
  ]},
  '3.2': { slides: [
    { id: 1, narrazio: "La maggior parte delle persone sa che dovrebbe fare cardio e pesi. Pochissime sanno davvero come funzionano e come combinarli. Capire il meccanismo di ciò che stai facendo ti rende autonomo. Non avrai più bisogno di seguire mode o programmi casuali: saprai costruire il tuo." },
    { id: 2, narrazio: "Il cardio LISS, a bassa intensità, è la camminata veloce, il ciclismo leggero, il nuoto rilassato. Intensità al 50-65% della frequenza cardiaca massima, durata 30-60 minuti. Ideale per i giorni di recupero e per i principianti. Il cardio HIIT alterna 20-40 secondi di sforzo massimale a 60-90 secondi di recupero, per soli 15-25 minuti totali. L'effetto EPOC mantiene il metabolismo elevato per 12-24 ore dopo." },
    { id: 3, narrazio: "Per l'allenamento di forza: per la forza massimale usa 3-5 serie da 1-5 ripetizioni con peso alto e recupero lungo. Per l'ipertrofia: 3-5 serie da 6-12 ripetizioni con peso medio-alto e recupero di 60-90 secondi. Per la resistenza muscolare e tonicità: 2-4 serie da 12-20 ripetizioni con peso moderato e recupero breve di 30-60 secondi." },
    { id: 4, narrazio: "La mobilità si perde rapidamente con l'età e il lavoro sedentario, e si recupera con 5-15 minuti al giorno. Una routine di mobilità quotidiana include Cat-Cow per la colonna, aperture dell'anca, rotazioni delle spalle e stretching dinamico pre-allenamento. Il foam rolling di 1-2 minuti per gruppo muscolare riduce tensioni e migliora la circolazione." },
    { id: 5, narrazio: "Completa il worksheet: analizza i tuoi punti di forza e le aree da migliorare per ogni gruppo muscolare. Assegna un punteggio da 1 a 5 alla tua flessibilità attuale e definisci l'obiettivo tra 8 settimane." },
    { id: 6, narrazio: "Nella prossima lezione trovi le schede complete e pronte all'uso per ogni obiettivo: principiante, tonificazione, dimagrimento, massa muscolare e over 60." },
  ]},
  '3.3': { slides: [
    { id: 1, narrazio: "Questa è la lezione più operativa del modulo. Trovi schede complete per ogni obiettivo con indicazioni precise su esercizi, serie, ripetizioni e recupero. Una scheda mediocre eseguita con costanza è infinitamente più efficace di una scheda perfetta abbandonata dopo 2 settimane." },
    { id: 2, narrazio: "Scheda A, Full Body per principianti, 3 giorni a settimana: squat a corpo libero, flessioni, hip thrust, rematore con manubri e plank. Settimane 1-2: impara la tecnica con carichi leggeri, la forma è più importante del peso. Settimane 3-4: inizia ad aumentare il carico quando le ultime 2 ripetizioni diventano facili. Dopo 8 settimane puoi passare a una scheda split." },
    { id: 3, narrazio: "Scheda B, Tonificazione femminile, 3 giorni a settimana. Giorno 1 gambe e glutei: hip thrust, squat, affondi camminati, leg curl e calf raise. Giorno 2 upper body e core: lat machine, panca inclinata, lavoro addominale. Giorno 3 full body: circuito misto con squat sumo, panca piana e HIIT finale con sprint da 30 secondi." },
    { id: 4, narrazio: "Scheda C, Dimagrimento, 4 giorni a settimana. Giorni 1 e 3: circuito full body con squat, flessioni, mountain climbers, burpees e HIIT finale di 10 round. Giorni 2 e 4: cardio LISS da 40-50 minuti al 60-70% della frequenza cardiaca massima, più core work con plank laterale e crunch inverso." },
    { id: 5, narrazio: "Scheda D, Massa muscolare, 4-5 giorni in split. Giorno 1 petto e tricipiti: panca piana, panca inclinata, aperture e dip. Giorno 2 schiena e bicipiti: stacco da terra, trazioni, rematore. Giorno 3 gambe e glutei. Giorno 4 spalle e core. Scheda E, Over 60 e funzionale: esercizi assistiti sicuri con 90 secondi di recupero, focus su equilibrio e mobilità." },
    { id: 6, narrazio: "Completa il worksheet adattando la scheda scelta al tuo programma personale. Nell'ultima lezione del modulo impariamo a ottimizzare il recupero: è lì che avvengono davvero i progressi." },
  ]},
  '3.4': { slides: [
    { id: 1, narrazio: "L'allenamento non è ciò che ti fa diventare più forte o più tonico. È lo stimolo. I progressi avvengono durante il recupero, quando il corpo ripara e rinforza i tessuti stimolati. Ignorare il recupero è come costruire su fondamenta instabili. Allenarsi di più non è sempre la soluzione: spesso la soluzione è allenarsi meglio, dormire di più, e dare al corpo il tempo di adattarsi." },
    { id: 2, narrazio: "Il sonno è il recupero più potente. Durante il sonno avvengono la sintesi proteica muscolare, il rilascio dell'ormone della crescita e la consolidazione delle memorie motorie. Il range ottimale è 7-9 ore. Sotto le 7 ore le performance calano del 10-30%. Per la qualità: temperatura tra 18 e 20 gradi, buio completo, silenzio, e niente schermi almeno 30 minuti prima di dormire." },
    { id: 3, narrazio: "La nutrizione post-allenamento: 20-40 grammi di proteine entro 30-60 minuti per attivare la sintesi proteica. 40-60 grammi di carboidrati per ricostituire il glicogeno muscolare. Il pasto ideale è riso più pollo con poco olio extravergine. Oppure yogurt greco con frutta e miele. Limita i grassi nelle ore immediatamente successive all'allenamento: rallentano l'assorbimento dei nutrienti." },
    { id: 4, narrazio: "Il recupero attivo non significa stare fermi. Il foam rolling di 1-2 minuti per gruppo muscolare risolve i nodi muscolari. Lo stretching post-allenamento di 5-10 minuti aumenta la flessibilità. Una camminata leggera il giorno dopo un allenamento intenso migliora la circolazione. Il bagno di contrasto, alternando 1 minuto freddo e 2 minuti caldo per 3 volte, riduce l'infiammazione." },
    { id: 5, narrazio: "Il sovrallenamento si verifica quando il volume supera la capacità del corpo di recuperare. Segnali di allarme: calo di performance, affaticamento persistente, disturbi del sonno e dolori articolari. Prevenzione: rispetta i giorni di riposo, non aumentare il volume di più del 10% a settimana, e fai una settimana di deload ogni 4-6 settimane con il 50-60% del volume normale." },
    { id: 6, narrazio: "Hai completato il Modulo 3. Hai le schede di allenamento complete, capisci come funziona il tuo corpo e sai come ottimizzare il recupero. Il Modulo 4, La Sfida dei 30 Giorni, si sblocca tra 7 giorni." },
  ]},

  // ── MODULO 4 — SFIDA 30 GIORNI ─────────────────────────────────────────────
  '4.1': { slides: [
    { id: 1, narrazio: "Perché alcune persone riescono a mantenere uno stile di vita sano senza sforzo apparente, mentre altri lottano continuamente? La risposta non sta nella forza di volontà: sta nelle abitudini. Le abitudini sono comportamenti automatici che il cervello esegue senza consumare energia cognitiva. Non devi trovare la motivazione ogni giorno. Devi costruire sistemi e abitudini che funzionino anche nei giorni in cui la motivazione è assente." },
    { id: 2, narrazio: "La neuroscienza ha identificato il ciclo a tre fasi che governa ogni abitudine. Il segnale, come mettere la tuta sportiva sul comodino la sera. La routine, come svegliarsi e andare ad allenarsi. E la ricompensa, il beneficio che rinforza il ciclo e lo rende permanente. Progetta i tuoi segnali in modo che siano visibili, specifici e automatici." },
    { id: 3, narrazio: "Cinque regole pratiche: inizia con versioni minime, anche solo 10 minuti. Non saltare mai due volte consecutive: saltare una volta è umano, saltare due è l'inizio di una nuova abitudine negativa. Riduci l'attrito preparando tutto in anticipo. Traccia visivamente con un calendario e una X ogni giorno. E abbina la nuova abitudine a una già esistente nella tua routine." },
    { id: 4, narrazio: "Perché 30 giorni? È abbastanza lungo da vedere risultati fisici e psicologici concreti. È abbastanza breve da sembrare gestibile e non schiacciante. E dopo 30 giorni di costanza il comportamento inizia a diventare automatico per la maggior parte delle persone. L'obiettivo non è completare la sfida: è iniziare uno stile di vita." },
    { id: 5, narrazio: "Progetta nel worksheet il tuo sistema di abitudini: il segnale che farà scattare l'allenamento, la routine esatta che seguirai, la ricompensa che ti darai dopo, e come ridurrai l'attrito per rendere tutto più facile." },
    { id: 6, narrazio: "Nella prossima lezione entriamo nella prima settimana con un piano giorno per giorno. Scoprirai perché la settimana 1 è la più pericolosa e come evitare la trappola dell'entusiasmo eccessivo." },
  ]},
  '4.2': { slides: [
    { id: 1, narrazio: "La settimana 1 è la più pericolosa. L'entusiasmo è alto, la motivazione è al massimo, e si tende a fare troppo troppo presto. Il risultato è dolori muscolari intensi, affaticamento eccessivo e un abbandono prematuro. Il ritmo della maratona si imposta al chilometro 1, non al chilometro 30. Inizia più lento di quanto pensi necessario." },
    { id: 2, narrazio: "Gli obiettivi delle settimane 1 e 2: 3 sessioni di allenamento da 20-30 minuti, non di più. L'obiettivo è creare l'abitudine, non esaurirti. Un solo cambiamento alimentare al giorno. Camminata di 30 minuti ogni giorno anche nei giorni di non allenamento. Un orario fisso di sveglia. E 2 litri di acqua al giorno come obiettivo minimo." },
    { id: 3, narrazio: "Il piano settimanale è strutturato giorno per giorno con un allenamento specifico, un focus nutrizionale e un obiettivo comportamentale per ogni giorno. La domenica è dedicata al riposo completo e al meal prep per la settimana successiva. La revisione settimanale del sabato è fondamentale: cosa ha funzionato? Cosa aggiusti?" },
    { id: 4, narrazio: "La checklist giornaliera delle settimane 1 e 2 è semplice ma potente: allenamento o camminata completato, obiettivo nutrizionale rispettato, idratazione da 2 litri, orario di sveglia fisso. Spunta ogni casella ogni giorno. La semplicità e la coerenza sono più importanti dell'intensità." },
    { id: 5, narrazio: "Prima di continuare, rispondi nel worksheet: cosa senti che potrebbe ostacolarti nelle prime due settimane? Chi ti può supportare? Come gestirai i giorni in cui non hai voglia? Qual è il cambiamento alimentare più impattante che puoi fare subito?" },
    { id: 6, narrazio: "Nella prossima lezione affrontiamo le settimane 3 e 4, il momento statisticamente più critico. Ti darò gli strumenti specifici per superare il plateau motivazionale." },
  ]},
  '4.3': { slides: [
    { id: 1, narrazio: "La settimana 3 è statisticamente il momento più critico di qualsiasi percorso di cambiamento. Il picco di entusiasmo è esaurito, i risultati visibili sono ancora limitati, e la novità ha perso il suo fascino. Chi supera la settimana 3 con costanza ha una probabilità molto alta di arrivare al giorno 30. La settimana 3 è dove si separa chi vuole da chi fa." },
    { id: 2, narrazio: "Gli obiettivi delle settimane 3 e 4: 4 sessioni di allenamento a settimana con volume o carico aumentato. La nutrizione si stabilizza: niente nuove restrizioni, consolida le abitudini già costruite. Il movimento sale a 8-10 mila passi al giorno. Si aggiunge una pratica di gratitudine o journaling di 5 minuti al giorno per lavorare anche sul mindset." },
    { id: 3, narrazio: "Quando arriva il plateau motivazionale: rivedi il tuo perché, rileggi quello che hai scritto nel Modulo 1. Cambia qualcosa di piccolo: un nuovo esercizio, una nuova ricetta, un nuovo percorso per la camminata. Cerca un compagno di allenamento, anche una volta a settimana. Guarda indietro, non avanti: confronta dove sei ora con dove eri al giorno 1." },
    { id: 4, narrazio: "La settimana 4 è quella dell'intensità massima: allenamenti da 45 minuti, HIIT al massimo, confronto delle foto di progressi, e pianificazione dei prossimi 30 giorni. È anche il momento di ringraziare chi ti ha supportato nel percorso e di condividere i tuoi risultati." },
    { id: 5, narrazio: "Traccia ogni giorno delle settimane 3 e 4 nel worksheet. Rispondi alle domande: come ti sentivi al giorno 1 rispetto a ora? Qual è il progresso più importante che hai notato? Cosa ti ha sorpreso di te stesso in queste settimane?" },
    { id: 6, narrazio: "Nell'ultima lezione del Modulo 4 affrontiamo le crisi, i fallimenti e come ripartire. La differenza tra chi ce la fa e chi abbandona non è che uno non ha mai fallito: è che uno ha imparato a riprendere velocemente." },
  ]},
  '4.4': { slides: [
    { id: 1, narrazio: "Nessun percorso di trasformazione è lineare. Ci saranno settimane saltate, pasti fuori piano, allenamenti mancati, periodi di stress intenso. Il fallimento non è l'opposto del successo: è parte del processo. Ciò che ti definisce non è cadere, ma quanto velocemente ti rialzi." },
    { id: 2, narrazio: "I tipi di crisi e come gestirli. Per una settimana saltata: riprendi il giorno dopo senza aspettare lunedì. Per un'abbuffata: il pasto successivo torna al piano, nessun dramma. Per la perdita di motivazione: rivedi il tuo perché e cambia un elemento del piano. Per un infortunio: continua con esercizi che non coinvolgono la zona dolorante e usa il tempo per lavorare su mobilità e nutrizione." },
    { id: 3, narrazio: "Il piano minimo per i giorni di crisi: 15 minuti di corpo libero a casa con squat, flessioni, plank e affondi. Proteine a ogni pasto, non serve altro. 20 minuti di camminata anche in pausa pranzo. E 7 ore di sonno come priorità assoluta. La regola è: esegui il piano minimo nei giorni di crisi. Mantieni la catena, anche con una versione ridotta." },
    { id: 4, narrazio: "Come trasformare il fallimento in apprendimento: analizza senza giudizio cosa è andato storto. Identifica il trigger specifico: era stress, mancanza di pianificazione, una situazione sociale? Progetta la soluzione concreta per la prossima volta. Riparti immediatamente. E celebra la ripresa: tornare dopo un fallimento è più difficile che non fermarsi mai." },
    { id: 5, narrazio: "Dopo i 30 giorni: non fermarti bruscamente, il corpo e la mente si sono adattati. Aggiusta il piano: cosa vuoi mantenere, cosa vuoi cambiare. Definisci un nuovo obiettivo per i prossimi 60-90 giorni. Rileggi i moduli con gli occhi di chi ha già fatto il percorso: capirai cose che prima erano astratte." },
    { id: 6, narrazio: "Hai completato il Modulo 4. Hai gli strumenti per costruire costanza, superare i momenti difficili e trasformare i 30 giorni in uno stile di vita. Il Modulo 5, Strumenti, Monitoraggio e il tuo Futuro, si sblocca tra 7 giorni." },
  ]},

  // ── MODULO 5 — STRUMENTI E FUTURO ─────────────────────────────────────────
  '5.1': { slides: [
    { id: 1, narrazio: "Viviamo nell'era d'oro del fitness tech: app, wearable, piattaforme e comunità online che possono rendere il tuo percorso più efficace, misurabile e motivante. Il pericolo è l'opposto: passare più tempo a cercare l'app perfetta che ad allenarsi. Un semplice diario cartaceo usato ogni giorno batte qualsiasi app sofisticata abbandonata dopo una settimana." },
    { id: 2, narrazio: "Per il tracciamento alimentare: MyFitnessPal ha il database più grande e lo scanner del codice a barre. Yazio è ottima per gli utenti italiani con interfaccia in italiano e ricette incluse. Cronometer è ideale per chi vuole analisi dettagliate dei micronutrienti. Tutte e tre hanno una versione gratuita funzionale per iniziare." },
    { id: 3, narrazio: "Per l'allenamento: Strong è la migliore per il log dei pesi in palestra. Nike Training Club e Freeletics sono eccellenti per il corpo libero. Strava è insostituibile per corsa e ciclismo outdoor con GPS tracking e community. Fitbod genera automaticamente il piano di allenamento in base ai tuoi log precedenti e all'attrezzatura disponibile." },
    { id: 4, narrazio: "I wearable più utili: gli smartwatch come Apple Watch e Garmin offrono monitoraggio continuo della frequenza cardiaca, GPS e ECG. Le fitness band come Xiaomi Mi Band sono più economiche e ottime per passi e sonno. L'anello Oura si concentra su HRV e qualità del recupero. Le bilance smart misurano non solo il peso ma anche percentuale di grasso e massa muscolare." },
    { id: 5, narrazio: "Completa il worksheet: per ogni cosa che vuoi monitorare, scegli uno strumento specifico, la frequenza di utilizzo e cosa ti aspetti di imparare. Sii concreto: meglio uno strumento usato bene che cinque strumenti usati male." },
    { id: 6, narrazio: "Nella prossima lezione impariamo a misurare i progressi nel modo corretto. Scoprirai perché il peso sulla bilancia è solo uno dei cinque indicatori che contano, e spesso non il più importante." },
  ]},
  '5.2': { slides: [
    { id: 1, narrazio: "Uno degli errori più comuni è misurare solo il peso sulla bilancia. Il peso è una singola variabile che dipende da decine di fattori: acqua corporea, ciclo mestruale, digestione, cibo mangiato il giorno prima. Usarlo come unico indicatore porta a frustrazioni inutili. La bilancia mente spesso. Il tuo corpo dice sempre la verità. Impara a leggere i segnali giusti." },
    { id: 2, narrazio: "I cinque indicatori di progresso da monitorare: il peso, misurato ogni mattina a digiuno ogni 1-2 volte a settimana. Le circonferenze di vita, fianchi, coscia e braccio ogni 2 settimane. Le foto di progressi ogni 2 settimane, sempre nella stessa luce e posizione. La performance in allenamento: pesi, serie, distanze. E il benessere soggettivo: energia, sonno, umore." },
    { id: 3, narrazio: "Il peso corporeo varia naturalmente di 1-3 kg nell'arco di una singola giornata, senza alcuna relazione con il grasso corporeo. Guarda il trend su 2-4 settimane, non il singolo numero giornaliero. Un calo di 200-500 grammi a settimana è ottimale. Se fai allenamento di forza potresti non perdere peso sulla bilancia mentre perdi grasso: il muscolo pesa più del grasso. È un ottimo segno." },
    { id: 4, narrazio: "La composizione corporea è l'indicatore che conta davvero. Due persone possono pesare lo stesso ma avere corpi completamente diversi. La percentuale di grasso corporeo e la massa muscolare descrivono il tuo fisico molto meglio del peso. Puoi misurarle con una bilancia smart, con le plicometrie dal tuo personal trainer, o semplicemente con le circonferenze e le foto." },
    { id: 5, narrazio: "Per il log dell'allenamento: registra ogni sessione con esercizio, serie, ripetizioni e peso. Richiede solo 2 minuti. Confronta ogni 4 settimane i pesi sugli esercizi principali. Ogni volta che batti il tuo record personale su un esercizio, segnalo. Costruisce fiducia e motivazione." },
    { id: 6, narrazio: "Completa il worksheet: crea il tuo sistema di misurazione con la tabella delle misure di partenza, gli obiettivi a 30, 60 e 90 giorni, e i record personali sugli esercizi principali." },
  ]},
  '5.3': { slides: [
    { id: 1, narrazio: "Perdere 5 kg è relativamente facile. Non riacquistarli è la sfida vera. Studi mostrano che l'80-95% delle persone che perdono peso lo riacquistano entro 2-5 anni. Non perché manchino di volontà, ma perché non hanno fatto la transizione da programma a stile di vita. Non esiste una fase di mantenimento separata dal percorso. Il mantenimento è il percorso." },
    { id: 2, narrazio: "Come fare la transizione: smetti di pensare a diete e programmi, sostituisci queste parole con come mangio normalmente e come mi muovo normalmente. Il linguaggio cambia l'identità. Definisci il tuo standard minimo: non il massimo che puoi fare, ma il minimo sotto cui non scendi mai. Costruisci un ambiente favorevole: se non hai junk food in casa, non lo mangerai." },
    { id: 3, narrazio: "Il minimo di mantenimento che basta per non perdere i progressi è semplice: 2 allenamenti a settimana, 30 minuti di camminata ogni giorno, un pasto proteico a ogni pasto principale. Distingui pausa da abbandono: una pausa pianificata è fisiologica. Smettere senza data di rientro è pericoloso. Fai una revisione trimestrale ogni 3 mesi per valutare obiettivi e progressi." },
    { id: 4, narrazio: "La trasformazione più profonda che questo corso vuole facilitare non è fisica: è mentale. Passare da devo allenarmi a voglio prendermi cura di me. Da dovere a identità. Da sacrificio a investimento. Ogni allenamento è un voto per la persona che stai diventando. Il corpo sano è la foundation di tutto il resto: energia, umore, produttività, relazioni." },
    { id: 5, narrazio: "Rispondi nel worksheet: qual è il tuo standard minimo di stile di vita sano che vuoi mantenere per sempre? L'ambiente intorno a te supporta o ostacola i tuoi obiettivi? Come descriveresti la persona che vuoi essere tra un anno?" },
    { id: 6, narrazio: "Nell'ultima lezione costruiamo insieme il tuo piano a 90 giorni. Tutto quello che hai imparato in questo corso converge in un piano d'azione concreto per il tuo futuro." },
  ]},
  '5.4': { slides: [
    { id: 1, narrazio: "Sei arrivato alla lezione finale del corso Torno in Forma. Ma questa non è la fine: è il punto di partenza. Tutto quello che hai imparato ha valore solo se diventa azione. Il cambiamento non avviene in 30 giorni. Avviene in 30 giorni alla volta, per il resto della vita. Ogni blocco di 90 giorni è un'opportunità di diventare una versione migliore." },
    { id: 2, narrazio: "Il metodo OKR si applica perfettamente al fitness personale. L'Obiettivo è ambizioso e ispirante: per esempio, raggiungere la migliore forma fisica della mia vita. I Key Result sono misurabili e specifici: ridurre la circonferenza vita da 90 a 82 centimetri, portare lo squat a 100 kg, allenarsi 4 volte a settimana per 12 settimane consecutive senza saltare." },
    { id: 3, narrazio: "Il piano a 90 giorni si divide in tre blocchi. Giorni 1-30: costruire le abitudini con 3 sessioni a settimana, tecnica perfetta e carichi leggeri. Giorni 31-60: progressione con 4 sessioni, carichi aumentati e HIIT. Giorni 61-90: consolidamento con 4-5 sessioni, focus sulla performance e nuovi record personali, più pianificazione del blocco successivo." },
    { id: 4, narrazio: "Il riepilogo del corso: il Modulo 1 ti ha dato il perché profondo e il sistema anti-sabotaggio. Il Modulo 2 la nutrizione pratica e il meal prep. Il Modulo 3 le schede complete e la scienza del recupero. Il Modulo 4 la costanza e la resilienza. Il Modulo 5 gli strumenti e il sistema di misurazione. Ora hai tutto." },
    { id: 5, narrazio: "Le prossime azioni immediate: identifica UNA cosa concreta che fai entro le prossime 24 ore. Rivedi il tuo piano settimanale. Prendi le misure di partenza se non lo hai ancora fatto. Condividi il tuo obiettivo con almeno una persona di fiducia. E rileggi i worksheet ogni 30 giorni come specchio di progresso." },
    { id: 6, narrazio: "Hai tutte le informazioni. Hai il piano. Hai gli strumenti. Ora hai solo bisogno di iniziare. Non aspettare il momento perfetto: il momento perfetto è adesso, con quello che hai. Grazie per aver completato il corso Torno in Forma. Il tuo percorso di trasformazione inizia oggi." },
  ]},
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function fileEsiste(path) {
  const parts  = path.split('/')
  const folder = parts.slice(0, -1).join('/')
  const file   = parts[parts.length - 1]
  const { data } = await supabase.storage.from(BUCKET).list(folder, { search: file })
  return data && data.length > 0
}

async function generaAudio(testo) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: testo,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.arrayBuffer()
}

async function caricaStorage(path, buffer) {
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: 'audio/mpeg',
    upsert: false,
  })
  if (error && error.message !== 'The resource already exists') throw new Error(error.message)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🎙️  Genera audio ElevenLabs — Corso completo Moduli 1-5\n')
  let generati = 0, saltati = 0, errori = 0

  for (const [lezioneNum, lezione] of Object.entries(LEZIONI)) {
    const folder = lezioneNum.replace('.', '-')
    console.log(`\n📚 Lezione ${lezioneNum} — ${lezione.slides.length} slides`)

    for (const slide of lezione.slides) {
      const storagePath = `${folder}/${slide.id}.mp3`
      const esiste = await fileEsiste(storagePath)

      if (esiste) {
        console.log(`  ⏭️  Slide ${slide.id} — già presente, skip`)
        saltati++
        continue
      }

      try {
        process.stdout.write(`  🔊 Slide ${slide.id} — generazione... `)
        const buffer = await generaAudio(slide.narrazio)
        await caricaStorage(storagePath, buffer)
        console.log(`✅  ${Math.round(buffer.byteLength / 1024)} KB`)
        generati++
        await sleep(DELAY_MS)
      } catch (err) {
        console.log(`❌  ${err.message}`)
        errori++
      }
    }
  }

  console.log(`\n─────────────────────────────────`)
  console.log(`✅ Generati:  ${generati}`)
  console.log(`⏭️  Saltati:   ${saltati}`)
  console.log(`❌ Errori:    ${errori}`)
  console.log(`─────────────────────────────────`)
  console.log('Audio caricati → Supabase Storage, bucket: corso-audio')
}

main().catch(err => { console.error('Errore fatale:', err); process.exit(1) })
