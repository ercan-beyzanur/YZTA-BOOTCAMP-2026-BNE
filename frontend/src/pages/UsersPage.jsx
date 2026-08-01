import { useEffect, useState } from 'react'
import { Users, Search, ChevronLeft, ChevronRight, Mail, Calendar } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'

const mockUsers = [
  { id: 1, username: 'ahmet_yilmaz', email: 'ahmet@example.com', created_at: '2026-01-15' },
  { id: 2, username: 'ayse_demir', email: 'ayse@example.com', created_at: '2026-02-03' },
  { id: 3, username: 'mehmet_kaya', email: 'mehmet@example.com', created_at: '2026-02-18' },
  { id: 4, username: 'zeynep_celik', email: 'zeynep@example.com', created_at: '2026-03-01' },
  { id: 5, username: 'ali_ozturk', email: 'ali@example.com', created_at: '2026-03-12' },
  { id: 6, username: 'fatma_dogan', email: 'fatma@example.com', created_at: '2026-03-25' },
  { id: 7, username: 'hasan_yildiz', email: 'hasan@example.com', created_at: '2026-04-02' },
  { id: 8, username: 'elif_aksoy', email: 'elif@example.com', created_at: '2026-04-15' },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading
        icon={Users}
        title="Kullanicilar"
        subtitle="Kayitli kullanicilarin listesi"
      />

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Kullanici ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-coal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kullanici
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kayit Tarihi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-emerald-dark">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-coal">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      {new Date(user.created_at).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-12 text-center text-sm text-gray-400">
                    Kullanici bulunamadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {filtered.length} kullanicidan {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} arasi
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                    page === i + 1
                      ? 'bg-emerald text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
