-- migrations/003_progressi_lezioni.sql
-- E:\tornoinforma-landing\migrations\003_progressi_lezioni.sql
-- Esegui su Supabase (vzwplpljxdqmdejvzwuw) → SQL Editor

-- Tabella progressi per singola lezione (più granulare di corso_progressi)
CREATE TABLE IF NOT EXISTS corso_progressi_lezioni (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  lezione_num TEXT NOT NULL,          -- es. '1.1', '1.2', '2.3'
  modulo_num INTEGER NOT NULL,        -- es. 1, 2, 3
  completata_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email, lezione_num)
);

CREATE INDEX IF NOT EXISTS cplez_email_idx ON corso_progressi_lezioni (email);
CREATE INDEX IF NOT EXISTS cplez_lezione_idx ON corso_progressi_lezioni (lezione_num);

ALTER TABLE corso_progressi_lezioni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_all_cplez" ON corso_progressi_lezioni
  FOR ALL TO service_role USING (true);

-- Bucket Supabase Storage per audio ElevenLabs
-- Esegui questo separatamente in Storage → New bucket
-- Nome bucket: corso-audio
-- Public: TRUE (gli audio sono accessibili con URL diretto)

-- Struttura cartelle nel bucket:
-- corso-audio/
--   1-1/   ← lezione 1.1
--     1.mp3
--     2.mp3
--     3.mp3
--     ... (una per ogni slide)
--   1-2/
--     1.mp3
--     ...
--   2-1/
--     1.mp3
--     ...
