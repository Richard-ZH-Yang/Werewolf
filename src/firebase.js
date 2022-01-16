import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

  apiKey: 'AIzaSyB5GHPhLPUPlkG8fyTLVAypXqc_BL-I3nw',
  authDomain: 'werewolf-aff7d.firebaseapp.com',
  projectId: 'werewolf-aff7d',
  storageBucket: 'werewolf-aff7d.appspot.com',
  messagingSenderId: '222168925184',
  appId: '1:222168925184:web:7f79fb388252bd349804e5',
  measurementId: 'G-0WTRJZZWL1',
})

export const auth = app.auth()
export default app
