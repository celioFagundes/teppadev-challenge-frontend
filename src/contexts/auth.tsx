import React, { createContext, useEffect, useState } from 'react'
import firebase from '../lib/firebase'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'

interface IAuthContext {
  user: User | null
  loading: boolean
  userSignOut: () => void
  userSignIn: {
    signInStatus: { success: boolean | null; message: string }
    signIn: (email: string, password: string) => void
  }
}
export const AuthContext = createContext<IAuthContext | null>(null)

const auth = getAuth(firebase)

const useSignInUser = (): [
  { success: boolean | null; message: string },
  (email: string, password: string) => void
] => {
  const [status, setStatus] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: '',
  })
  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => setStatus({ success: true, message: 'Success' }))
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setStatus({ success: false, message: 'Invalid credentials' })
        }else{
          setStatus({ success: false, message: 'Could not sign in' })
        }
      })
  }
  return [status, signIn]
}

const useGetUser = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticationLoaded, setIsAuthenticationLoaded] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser)
        setIsAuthenticationLoaded(true)
      } else {
        setUser(null)
        setIsAuthenticationLoaded(true)
      }
    })
  }, [])
  return [user, isAuthenticationLoaded]
}

const userSignOut = () => {
  signOut(auth)
}

interface ProviderProps {
  children: React.ReactNode
}
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, loading] = useGetUser()
  const [signInStatus, signIn] = useSignInUser()

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userSignOut,
        userSignIn: {
          signInStatus,
          signIn,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
