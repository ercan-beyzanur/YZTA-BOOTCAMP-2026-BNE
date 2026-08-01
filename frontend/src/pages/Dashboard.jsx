import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Users, Activity, FileText, Bot,
  TrendingUp, Clock, CheckCircle, AlertCircle, Wifi, WifiOff,
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts'
import StatCard from '../components/cards/StatCard'
import SectionHeading from '../components/ui/SectionHeading'
import { healthCheck } from '../api/authApi'

const mockStats = {
  totalUsers: 1247,
  usersChange: '+12.5%',
  activeSessions: 89,
  sessionsChange: '+8.3%',
  documentsProcessed: 3420,
  docsChange: '+23.1%',
  aiResponses: 15800,
  responsesChange: '+15.7%',
}

const weeklyData = [
  { day: 'Pzt', users: 45, sessions: 120, responses: 890 },
  { day: 'Sal', users: 52, sessions: 135, responses: 920 },
  { day: 'Car', users: 49, sessions: 128, responses: 870 },
  { day: 'Per', users: 63, sessions: 155, responses: 1050 },
  { day: 'Cum', users: 58, sessions: 142, responses: 980 },
  { day: 'Cmt', users: 34, sessions: 89, responses: 620 },
  { day: 'Paz', users: 28, sessions: 72, responses: 510 },
]

const recentActivity = [
  { id: 1, user: 'Ahmet Yilmaz', action: 'Yeni belge yukledi', time: '5 dk once', status: 'success' },
  { id: 2, user: 'Ayse Demir', action: 'AI sorgusu yapti', time: '12 dk once', status: 'info' },
  { id: 3, user: 'Mehmet Kaya', action: 'Sistem ayarlarini guncelledi', time: '23 dk once', status: 'warning' },
  { id: 4, user: 'Zeynep Celik', action: 'Yeni kullanici kaydoldu', time: '1 saat once', status: 'success' },
  { id: 5, user: 'Ali Ozturk', action: 'Rapor olusturdu', time: '2 saat once', status: 'info' },
]

const statusColors = {
  success: 'bg-emerald/10 text-emerald-dark',
  info: 'bg-blue-500/10 text-blue-500',
  warning: 'bg-amber-500/10 text-amber-500',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-coal mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [stats, setStats] = useState(mockStats)
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    setLoading(true)
    healthCheck()
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'))
      .finally(() => {
        setStats(mockStats)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeading
        icon={Activity}
        title="Genel Bakis"
        subtitle="Sistem durumu ve istatistikleri"
        action={
          <div className="flex items-center gap-2 text-xs font-medium">
            {apiStatus === 'online' && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald/10 text-emerald-dark rounded-full">
                <Wifi size={12} />
                Backend Bagli
              </span>
            )}
            {apiStatus === 'offline' && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-full">
                <WifiOff size={12} />
                Backend Baglanti Disi
              </span>
            )}
            {apiStatus === 'checking' && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full">
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Kontrol Ediliyor
              </span>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={Users}
          label="Toplam Kullanici"
          value={stats.totalUsers.toLocaleString()}
          change={stats.usersChange}
          changeType="up"
        />
        <StatCard
          icon={Activity}
          label="Aktif Oturum"
          value={stats.activeSessions}
          change={stats.sessionsChange}
          changeType="up"
        />
        <StatCard
          icon={FileText}
          label="Islenen Belge"
          value={stats.documentsProcessed.toLocaleString()}
          change={stats.docsChange}
          changeType="up"
        />
        <StatCard
          icon={Bot}
          label="AI Yanit"
          value={stats.aiResponses.toLocaleString()}
          change={stats.responsesChange}
          changeType="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <SectionHeading
            icon={TrendingUp}
            title="Haftalik Aktivite"
            subtitle="Son 7 gunun verileri"
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Kullanicilar"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#colorUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="responses"
                  name="AI Yanitlari"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorResponses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <SectionHeading
            icon={Clock}
            title="Son Aktiviteler"
          />
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg mt-0.5 ${statusColors[item.status]}`}>
                  {item.status === 'success' && <CheckCircle size={14} />}
                  {item.status === 'info' && <Activity size={14} />}
                  {item.status === 'warning' && <AlertCircle size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coal truncate">{item.user}</p>
                  <p className="text-xs text-gray-500 truncate">{item.action}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <SectionHeading
          icon={BarChart}
          title="Gunluk Oturum Dagilimi"
          subtitle="Haftalik oturum istatistikleri"
        />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sessions" name="Oturumlar" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
