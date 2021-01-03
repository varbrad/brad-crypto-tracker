import admin from 'firebase-admin'
import { firebaseConfig } from '../../config/firebase'

const initializeFirebase = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.server),
  })
}

export const firebaseAdmin = admin.apps[0] || initializeFirebase()
