import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Send, Bot, User, Trash2, Loader2, BookOpen } from 'lucide-react'
import { sendChatMessage, clearChat } from '../store/actions/chatActions'
import SectionHeading from '../components/ui/SectionHeading'
import toast from 'react-hot-toast'

export default function Chat() {
  const [input, setInput] = useState('')
  const [showContext, setShowContext] = useState(null)
  const dispatch = useDispatch()
  const { messages, sending, error } = useSelector((state) => state.chat)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || sending) return

    setInput('')
    const success = await dispatch(sendChatMessage(trimmed))
    if (!success) {
      toast.error('Mesaj gonderilemedi')
    }
  }

  const handleClear = () => {
    dispatch(clearChat())
    toast.success('Sohbet temizlendi')
  }

  const suggestedQuestions = [
    'Iade politikaniz nedir?',
    'Kargo takibi nasil yapilir?',
    'Uyelik iptali nasil gerceklestirilir?',
    'Siparisimi nasil iptal edebilirim?',
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <SectionHeading
          icon={Bot}
          title="AI Destek Ajanı"
          subtitle="SupportAgent.AI ile sohbet edin"
        />
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <Trash2 size={16} />
            Temizle
          </button>
        )}
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="p-4 rounded-2xl bg-emerald/10">
                <Bot size={48} className="text-emerald" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-coal">SupportAgent.AI'ye Hos Geldiniz</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md">
                  Musteri destek konularinda yapay zeka destekli yanitlar almak icin
                  asagidaki ornek sorulari kullanabilirsiniz veya kendi sorunuzu yazin.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q)
                      inputRef.current?.focus()
                    }}
                    className="text-left px-4 py-3 bg-gray-50 hover:bg-emerald/5 border border-gray-200 hover:border-emerald/30 rounded-xl text-sm text-gray-600 hover:text-emerald-dark transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center mt-1">
                  <Bot size={16} className="text-emerald" />
                </div>
              )}

              <div
                className={`max-w-[70%] ${
                  msg.role === 'user'
                    ? 'bg-emerald text-white rounded-2xl rounded-br-md'
                    : 'bg-gray-50 text-coal border border-gray-200 rounded-2xl rounded-bl-md'
                } px-4 py-3`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                {msg.role === 'assistant' && msg.context && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => setShowContext(showContext === msg.id ? null : msg.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald transition-colors"
                    >
                      <BookOpen size={12} />
                      {showContext === msg.id ? 'Kaynagi gizle' : 'Bilgi kaynagini goster'}
                    </button>
                    {showContext === msg.id && (
                      <div className="mt-2 p-3 bg-white rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                        {msg.context}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mt-1">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center mt-1">
                <Bot size={16} className="text-emerald" />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Loader2 size={14} className="animate-spin" />
                  Dusunuyor...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-100 p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sorunuzu yazin..."
              disabled={sending}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-coal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="p-3 bg-emerald hover:bg-emerald-dark text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
