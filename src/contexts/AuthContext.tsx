import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot, collection } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  profile: any;
  loading: boolean;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let profileUnsubscribe: (() => void) | undefined;

    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email);
      setUser(user);
      
      if (user) {
        // Set up real-time listener for profile
        profileUnsubscribe = onSnapshot(doc(db, 'profiles', user.uid), (doc) => {
          if (doc.exists()) {
            const profileData = {
              uid: user.uid,
              email: user.email,
              ...doc.data()
            };
            console.log('Profile updated:', profileData);
            setProfile(profileData);
          }
        }, (error) => {
          console.error('Error in profile listener:', error);
          setProfile(null);
        });
      } else {
        if (profileUnsubscribe) {
          profileUnsubscribe();
        }
        console.log('No user, clearing profile');
        setProfile(null);
      }
      
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setLoading(false);
    });

    return () => {
      authUnsubscribe();
      if (profileUnsubscribe) {
        profileUnsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      const profileRef = doc(db, 'profiles', user.uid);
      await setDoc(profileRef, {
        username,
        fullName,
        email,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        isOnline: true
      });

      return user;
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (result.user) {
        // Update user's online status and last seen
        const profileRef = doc(db, 'profiles', result.user.uid);
        await setDoc(profileRef, {
          lastSeen: new Date().toISOString(),
          isOnline: true
        }, { merge: true });
      }
      
      return result;
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        // Update user's online status and last seen before signing out
        const profileRef = doc(db, 'profiles', user.uid);
        await setDoc(profileRef, {
          lastSeen: new Date().toISOString(),
          isOnline: false
        }, { merge: true });
      }
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}