import { createContext, useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restoreSession } from '../store/actions/authActions'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    dispatch(restoreSession())
    setInitialized(true)
  }, [dispatch])

  return (
    <AuthContext.Provider value={{ user, loading: loading || !initialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
