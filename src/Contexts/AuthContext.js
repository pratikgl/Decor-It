import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import firebase from 'firebase/app'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function verifyPassword(password) {
    var creditional = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    )
    return currentUser.reauthenticateWithCredential(creditional)
  }

  function addUserDb(fname, lname, email, uid) {
    const data = {
      fname: fname,
      lname: lname,
      email: email
    }
    return db.collection('users').doc(uid).set(data);
  }

  function getData() {
    return db.collection('users').doc(currentUser.uid).get()
  }

  function getItems() {
    return db.collection('items').get()
  }

  function addItem(uid, details, price, heading, url) {
    const data = {
      details: details,
      price: price,
      heading: heading,
      url: url
    }
    return db.collection('items').doc(uid).set(data);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    verifyPassword,
    addUserDb,
    getData,
    getItems,
    addItem,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}