import { useState } from 'react'
import { Settings as SettingsIcon, Save, Bell, Shield, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import SectionHeading from '../components/ui/SectionHeading'
import toast from 'react-hot-toast'

export default function Settings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    siteName: 'SupportAgent.AI',
    language: 'tr',
    emailNotifications: true,
    pushNotifications: false,
    twoFactor: false,
    apiRateLimit: '100',
  })

  const handleSave = () => {
    toast.success('Ayarlar kaydedildi!')
  }

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <SectionHeading
        icon={SettingsIcon}
        title="Ayarlar"
        subtitle="Sistem ve hesap ayarlarinizi yonetin"
      />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <Globe size={18} className="text-emerald" />
          <h3 className="text-sm font-semibold text-coal">Genel Ayarlar</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-coal">Site Adi</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-coal focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-coal">Dil</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-coal focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            >
              <option value="tr">Turkce</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <Bell size={18} className="text-emerald" />
          <h3 className="text-sm font-semibold text-coal">Bildirim Ayarlari</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-coal">E-posta Bildirimleri</p>
              <p className="text-xs text-gray-500">Onemli guncellemeler icin e-posta alin</p>
            </div>
            <button
              onClick={() => handleChange('emailNotifications', !settings.emailNotifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-emerald' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.emailNotifications ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-coal">Push Bildirimleri</p>
              <p className="text-xs text-gray-500">Tarayici bildirimleri alin</p>
            </div>
            <button
              onClick={() => handleChange('pushNotifications', !settings.pushNotifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-emerald' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.pushNotifications ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <Shield size={18} className="text-emerald" />
          <h3 className="text-sm font-semibold text-coal">Guvenlik</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-coal">Iki Faktorlu Dogrulama</p>
              <p className="text-xs text-gray-500">Hesabiniza ekstra guvenlik katmani ekleyin</p>
            </div>
            <button
              onClick={() => handleChange('twoFactor', !settings.twoFactor)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.twoFactor ? 'bg-emerald' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.twoFactor ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-coal">API Hiz Limiti (istek/dakika)</label>
            <input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => handleChange('apiRateLimit', e.target.value)}
              className="w-full max-w-xs px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-coal focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald hover:bg-emerald-dark text-white font-medium rounded-xl transition-all duration-200"
        >
          <Save size={18} />
          Kaydet
        </button>
      </div>
    </div>
  )
}
