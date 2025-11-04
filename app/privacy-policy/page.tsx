import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Torno In Forma',
  description: 'Informativa sulla privacy e trattamento dei dati personali di Torno In Forma',
  robots: 'noindex, nofollow'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Ultimo aggiornamento: 4 Novembre 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Titolare del Trattamento</h2>
            <p className="text-gray-700 leading-relaxed">
              Il Titolare del trattamento dei dati è <strong>Torno In Forma</strong> (Andrea Parisotto), con sede operativa in Via Albere 27/B, 37138 Verona (VR).
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              Per qualsiasi informazione relativa al trattamento dei tuoi dati personali puoi contattarci:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Email: <a href="mailto:info@tornoinforma.it" className="text-blue-600 hover:underline">info@tornoinforma.it</a></li>
              <li>Telefono: <a href="tel:+393478881515" className="text-blue-600 hover:underline">347 888 1515</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dati Raccolti e Finalità</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Dati forniti volontariamente</h3>
            <p className="text-gray-700 leading-relaxed">
              Quando ci contatti tramite il sito web, WhatsApp, email o telefono, possiamo raccogliere:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Eventuali messaggi o richieste che ci invii</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Finalità:</strong> Rispondere alle tue richieste di informazioni, fornirti preventivi per i servizi di coaching online, gestire le iscrizioni e le comunicazioni relative ai programmi di allenamento.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              <strong>Base giuridica:</strong> Consenso dell&apos;interessato e esecuzione di misure precontrattuali.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Dati dei clienti</h3>
            <p className="text-gray-700 leading-relaxed">
              Se ti iscrivi ai nostri programmi di coaching online, raccoglieremo ulteriori informazioni:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Dati anagrafici completi</li>
              <li>Dati di pagamento (gestiti tramite provider sicuri come Stripe)</li>
              <li>Dati relativi alla salute e fitness (obiettivi, livello di allenamento, eventuali limitazioni)</li>
              <li>Misurazioni e progressi fisici</li>
              <li>Dati di utilizzo della piattaforma (accessi, video visualizzati, allenamenti completati)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Finalità:</strong> Erogazione del servizio di coaching online, personalizzazione programmi di allenamento, monitoraggio progressi, supporto motivazionale, gestione abbonamenti e pagamenti.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              <strong>Base giuridica:</strong> Esecuzione del contratto, consenso esplicito per i dati relativi alla salute, adempimento di obblighi di legge (fatturazione).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Dati di navigazione</h3>
            <p className="text-gray-700 leading-relaxed">
              Durante la navigazione del sito possono essere raccolti automaticamente:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Indirizzo IP</li>
              <li>Tipo di browser e dispositivo</li>
              <li>Pagine visitate</li>
              <li>Tempo di permanenza sul sito</li>
              <li>Provenienza geografica</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Finalità:</strong> Garantire il funzionamento del sito, analisi statistiche per migliorare l&apos;esperienza utente e i contenuti offerti.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              <strong>Base giuridica:</strong> Legittimo interesse del titolare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookie e Tecnologie Simili</h2>
            <p className="text-gray-700 leading-relaxed">
              Il nostro sito utilizza cookie tecnici necessari al funzionamento e cookie analitici (previo tuo consenso) per migliorare l&apos;esperienza di navigazione.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              Per maggiori informazioni consulta la nostra <a href="/cookie-policy" className="text-blue-600 hover:underline font-semibold">Cookie Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Modalità di Trattamento</h2>
            <p className="text-gray-700 leading-relaxed">
              I dati personali sono trattati con strumenti informatici e telematici. Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, perdita o distruzione.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              I dati sono accessibili solo:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Al team di Torno In Forma per l&apos;erogazione dei servizi di coaching</li>
              <li>A fornitori di servizi tecnici (hosting, piattaforma video, CRM, payment processor) che agiscono come Responsabili del Trattamento</li>
              <li>Al commercialista per adempimenti fiscali e contabili</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Periodo di Conservazione</h2>
            <p className="text-gray-700 leading-relaxed">
              I tuoi dati saranno conservati per il tempo strettamente necessario:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li><strong>Dati di contatto pre-iscrizione:</strong> 12 mesi dall&apos;ultimo contatto</li>
              <li><strong>Dati dei clienti attivi:</strong> Per tutta la durata dell&apos;abbonamento</li>
              <li><strong>Dati post-abbonamento:</strong> 10 anni per obblighi fiscali e contabili</li>
              <li><strong>Dati sanitari e progressi:</strong> 10 anni dalla cessazione del servizio</li>
              <li><strong>Dati di navigazione:</strong> Non oltre 24 mesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. I Tuoi Diritti</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In qualità di interessato, hai il diritto di:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Accesso:</strong> Ottenere conferma dell&apos;esistenza dei tuoi dati e riceverne copia</li>
              <li><strong>Rettifica:</strong> Correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione:</strong> Ottenere la cancellazione dei dati (diritto all&apos;oblio)</li>
              <li><strong>Limitazione:</strong> Limitare il trattamento in casi specifici</li>
              <li><strong>Portabilità:</strong> Ricevere i dati in formato strutturato</li>
              <li><strong>Opposizione:</strong> Opporti al trattamento per motivi legittimi</li>
              <li><strong>Revoca consenso:</strong> Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-6">
              Per esercitare i tuoi diritti scrivi a: <a href="mailto:info@tornoinforma.it" className="text-blue-600 hover:underline font-semibold">info@tornoinforma.it</a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Hai inoltre il diritto di proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati Personali.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Trasferimento Dati Extra-UE</h2>
            <p className="text-gray-700 leading-relaxed">
              I dati potrebbero essere trasferiti a fornitori di servizi cloud situati extra-UE (es. server hosting, piattaforme video). In tal caso, garantiamo che tali trasferimenti avvengano in conformità con il GDPR e con adeguate garanzie contrattuali (clausole contrattuali standard).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifiche alla Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Questa Privacy Policy può essere aggiornata periodicamente. Ti invitiamo a consultarla regolarmente. La data dell&apos;ultimo aggiornamento è sempre indicata in alto.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contatti</h2>
            <p className="text-gray-700 leading-relaxed">
              Per qualsiasi domanda o richiesta riguardo questa Privacy Policy:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700"><strong>Torno In Forma</strong></p>
              <p className="text-gray-700">Via Albere 27/B, 37138 Verona (VR)</p>
              <p className="text-gray-700">Email: <a href="mailto:info@tornoinforma.it" className="text-blue-600 hover:underline">info@tornoinforma.it</a></p>
              <p className="text-gray-700">Tel: <a href="tel:+393478881515" className="text-blue-600 hover:underline">347 888 1515</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
