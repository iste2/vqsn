// admin-config.ts
import { initializeApp, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

// Declare global variables to hold our instances
declare global {
  // eslint-disable-next-line no-var
  var _firebaseApp: App | undefined;
  // eslint-disable-next-line no-var
  var _firestoreInstance: Firestore | undefined;
}

// Initialize Firebase Admin if not already initialized
if (!global._firebaseApp) {
  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  }

  global._firebaseApp = initializeApp(firebaseAdminConfig, "app")
}

// Initialize Firestore if not already initialized
if (!global._firestoreInstance) {
  global._firestoreInstance = getFirestore(global._firebaseApp)
  global._firestoreInstance.settings({ ignoreUndefinedProperties: true })
}

// Export the global instance
export const adminDb = global._firestoreInstance