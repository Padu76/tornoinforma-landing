-- migrations/002_corso.sql
-- Esegui su Supabase UtilityLab (vzwplpljxdqmdejvzwuw)

-- Tabella acquisti corso
CREATE TABLE IF NOT EXISTS corso_acquisti (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  nome TEXT,
  paypal_order_id TEXT UNIQUE,
  importo NUMERIC(10,2) DEFAULT 249.00,
  stato TEXT DEFAULT 'completato',
  acquistato_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS corso_acquisti_email_idx ON corso_acquisti (lower(email));
CREATE INDEX IF NOT EXISTS corso_acquisti_paypal_idx ON corso_acquisti (paypal_order_id);

ALTER TABLE corso_acquisti ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_all_corso_acquisti" ON corso_acquisti
  FOR ALL TO service_role USING (true);

-- Tabella sessioni accesso (magic link)
CREATE TABLE IF NOT EXISTS corso_sessioni (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  usato BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS corso_sessioni_token_idx ON corso_sessioni (token);
CREATE INDEX IF NOT EXISTS corso_sessioni_email_idx ON corso_sessioni (email);

ALTER TABLE corso_sessioni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_all_corso_sessioni" ON corso_sessioni
  FOR ALL TO service_role USING (true);

-- Tabella progressi (traccia apertura moduli)
CREATE TABLE IF NOT EXISTS corso_progressi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  modulo_num INTEGER NOT NULL,
  aperto_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email, modulo_num)
);

ALTER TABLE corso_progressi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_all_corso_progressi" ON corso_progressi
  FOR ALL TO service_role USING (true);
