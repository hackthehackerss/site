/*
  # Add User Stats and Tracking

  1. New Tables
    - `user_stats`
      - Tracks user XP, rank, level, and other stats
    - `user_achievements`
      - Tracks user achievements and badges
    - `user_activity_log`
      - Tracks user actions and progress

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  rank integer DEFAULT 0,
  challenges_completed integer DEFAULT 0,
  total_points integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_active_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_type text NOT NULL,
  name text NOT NULL,
  description text,
  earned_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create user_activity_log table
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  description text NOT NULL,
  xp_earned integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activity log"
  ON user_activity_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to initialize user stats
CREATE OR REPLACE FUNCTION initialize_user_stats()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_stats (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user stats
CREATE TRIGGER on_user_created_initialize_stats
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_stats();

-- Create function to update user XP and level
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS trigger AS $$
BEGIN
  -- Calculate level based on XP (sqrt of XP/100)
  NEW.level := GREATEST(1, floor(sqrt(NEW.xp::float / 100))::integer);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for XP updates
CREATE TRIGGER on_xp_update_calculate_level
  BEFORE UPDATE OF xp ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();