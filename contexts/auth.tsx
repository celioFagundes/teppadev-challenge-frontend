import React, { createContext, useEffect, useState } from 'react'
import firebase from '../lib/firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
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
    signInStatus: {}
    signIn: (email: string, password: string) => void
  }
  createUser: {
    createUserStatus: { success: string; error: string }
    createUser: (email: string, password: string) => void
  }
}
export const AuthContext = createContext<IAuthContext | null>(null)

const auth = getAuth(firebase)

const useCreateUser = (): [
  { success: string; error: string },
  (email: string, password: string) => void
] => {
  const [status, setStatus] = useState({ success: '', error: '' })

  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        setStatus({ success: 'ok', error: '' })
      })
      .catch(err => {
        setStatus({ success: '', error: err })
      })
  }
  return [status, createUser]
}

const useSignInUser = (): [{}, (email: string, password: string) => void] => {
  const [status, setStatus] = useState({})

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).catch(err => {
      setStatus(err)
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
  signOut(auth).then(() => {
    window.location.reload()
  })
}

interface ProviderProps {
  children: React.ReactNode
}
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, loading] = useGetUser()
  const [createUserStatus, createUser] = useCreateUser()
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
        createUser: {
          createUserStatus,
          createUser,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
