import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { getShopkeeperName } from '../database'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  async function signup(email, password) {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  const [currentUser, setCurrentUser] = useState()
  const [name, setName] = useState()
  const [loading, setLoading] = useState(true)

  async function GetShopkeeperName(currentUser) {
    let name = await getShopkeeperName(currentUser)
    return setName(name)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    name, 
    GetShopkeeperName
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
