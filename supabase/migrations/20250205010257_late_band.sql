/*
  # Add badges system
  
  1. New Tables
    - `badges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `course_id` (text)
      - `badge_type` (text)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `earned_at` (timestamptz)
      - `shared_count` (integer)
  
  2. Security
    - Enable RLS on `badges` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  course_id text NOT NULL,
  badge_type text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  shared_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own badges"
  ON badges
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own badges"
  ON badges
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);