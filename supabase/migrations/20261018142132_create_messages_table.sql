/*
# Create messages table (single-tenant, no auth)

1. New Tables
- `messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's email
  - `message` (text, not null) — the message body
  - `created_at` (timestamptz) — when the message was sent

2. Security
- Enable RLS on `messages`.
- Allow anon + authenticated to INSERT (visitors can submit the contact form without signing in).
- No SELECT/UPDATE/DELETE for anon — only the portfolio owner (via service role / dashboard) reads messages.
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages"
ON messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);
