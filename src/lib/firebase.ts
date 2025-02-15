import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2acFisql4JMzNTHUPQA06J8hjtccxYZM",
  authDomain: "hackthehackers-3a983.firebaseapp.com",
  projectId: "hackthehackers-3a983",
  storageBucket: "hackthehackers-3a983.firebasestorage.app",
  messagingSenderId: "200316725086",
  appId: "1:200316725086:web:1a9588dc25d9a909e551cf",
  measurementId: "G-52TPBPCPVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth(app);

// Set persistence immediately
setPersistence(auth, browserLocalPersistence);

// Initialize Firestore
const db = getFirestore(app);

// Initialize collections if they don't exist
const initializeUserCollections = async (userId: string) => {
  try {
    // Initialize user stats
    await setDoc(doc(db, 'user_stats', userId), {
      xp: 0,
      level: 1,
      rank: 0,
      challengesCompleted: 0,
      totalPoints: 0,
      streakDays: 0,
      lastActiveAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // Initialize achievements collection with a welcome achievement
    await setDoc(doc(collection(db, 'user_achievements'), `${userId}_welcome`), {
      userId,
      achievementType: 'account_created',
      name: 'Welcome to HackTheHackers',
      description: 'Started your cybersecurity journey',
      earnedAt: new Date().toISOString(),
      metadata: {},
      createdAt: new Date().toISOString()
    }, { merge: true });

    // Initialize activity log with first activity
    await setDoc(doc(collection(db, 'user_activity_log'), `${userId}_welcome`), {
      userId,
      activityType: 'account_created',
      description: 'Created HackTheHackers account',
      xpEarned: 100,
      pointsEarned: 0,
      metadata: {},
      createdAt: new Date().toISOString()
    }, { merge: true });

  } catch (error) {
    console.error('Error initializing user collections:', error);
    throw error;
  }
};

// Helper function to ensure collections exist
const ensureCollections = async (userId: string) => {
  try {
    const collections = ['user_stats', 'user_achievements', 'user_activity_log'];
    
    for (const collectionName of collections) {
      const docRef = doc(db, collectionName, userId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await initializeUserCollections(userId);
        break; // Only need to initialize once if any collection is missing
      }
    }
  } catch (error) {
    console.error('Error ensuring collections:', error);
  }
};

export { auth, db, initializeUserCollections, ensureCollections };