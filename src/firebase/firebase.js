import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
  apiKey: "AIzaSyC8GTGiK1-PXVgJwAvqPMDcccNdGxyRSig",
  authDomain: "react-hooks-auth-one.firebaseapp.com",
  databaseURL: "https://react-hooks-auth-one.firebaseio.com",
  projectId: "react-hooks-auth-one",
  storageBucket: "react-hooks-auth-one.appspot.com",
  messagingSenderId: "493899542018",
  appId: "1:493899542018:web:0caffc997b05725833c11b",
  measurementId: "G-TCQW7JFDDH"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  addQuote(quote) {
    if(!this.auth.currentUser) {
      return alert('not authorized')
    }
    return this.db.doc(`users_auth_one/${this.auth.currentUser.uid}`).set({
     quote
    })
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_auth_one/${this.auth.currentUser.uid}`).get()
    return quote.get('quote')
  }
}

export default new Firebase();