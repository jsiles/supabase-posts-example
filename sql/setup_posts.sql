-- Script: crear tabla posts + RLS + índices
-- Ejecutar en SQL Editor de Supabase o psql conectado al proyecto

create extension if not exists "pgcrypto";

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS posts_user_id_idx ON posts (user_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts (created_at);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Select own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Insert own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Delete own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);