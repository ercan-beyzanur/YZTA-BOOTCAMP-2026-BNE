import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { login } from '../store/actions/authActions'
import FormInput from '../components/ui/FormInput'
import Logo from '../components/ui/Logo'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Lutfen tum alanlari doldurun')
      return
    }
    const success = await dispatch(login({ email, password }))
    if (success) {
      toast.success('Giris basarili!')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={48} />
          </div>
          <h1 className="text-2xl font-bold text-coal">SupportAgent.AI</h1>
          <p className="text-gray-500 mt-2 text-sm">Yonetim paneline giris yapin</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              icon={Mail}
              label="E-posta"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              icon={Lock}
              label="Sifre"
              type="password"
              placeholder="Sifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="bg-red-500/10 text-red-600 text-sm px-4 py-2.5 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald hover:bg-emerald-dark text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Giris Yap
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Hesabiniz yok mu?{' '}
          <Link to="/register" className="text-emerald font-medium hover:text-emerald-dark transition-colors">
            Kayit Olun
          </Link>
        </p>
      </div>
    </div>
  )
}
