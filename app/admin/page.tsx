'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Lock,
  Unlock,
  Mail,
  Trash2,
  CheckCircle2,
  Circle,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Shield,
  Terminal,
  Clock,
  User,
  Inbox,
  AlertCircle,
} from 'lucide-react'

interface Transmission {
  id: string
  timestamp: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
}

export default function AdminInboxPage() {
  const [passkey, setPasskey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [transmissions, setTransmissions] = useState<Transmission[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [actionMessage, setActionMessage] = useState('')

  // Check sessionStorage for persisted session
  useEffect(() => {
    const savedKey = sessionStorage.getItem('vedant_admin_key')
    if (savedKey) {
      setPasskey(savedKey)
      fetchTransmissions(savedKey)
    }
  }, [])

  const fetchTransmissions = async (key: string) => {
    setIsLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/transmission', {
        headers: {
          'x-admin-key': key,
        },
      })

      if (res.status === 401) {
        setAuthError('Access denied: Invalid personal passkey.')
        setIsAuthenticated(false)
        sessionStorage.removeItem('vedant_admin_key')
        return
      }

      if (!res.ok) {
        throw new Error('Failed to retrieve transmissions')
      }

      const data = await res.json()
      setTransmissions(data.transmissions || [])
      setIsAuthenticated(true)
      sessionStorage.setItem('vedant_admin_key', key)
    } catch (err: any) {
      setAuthError(err.message || 'Error connecting to transmission backend.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passkey.trim()) return
    fetchTransmissions(passkey.trim())
  }

  const handleLogout = () => {
    sessionStorage.removeItem('vedant_admin_key')
    setIsAuthenticated(false)
    setPasskey('')
    setTransmissions([])
  }

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch('/api/transmission', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey,
        },
        body: JSON.stringify({ id, read: !currentRead }),
      })

      if (res.ok) {
        setTransmissions((prev) =>
          prev.map((t) => (t.id === id ? { ...t, read: !currentRead } : t))
        )
        showNotification(
          !currentRead ? 'Marked as read' : 'Marked as unread'
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this transmission?')) {
      return
    }

    try {
      const res = await fetch(`/api/transmission?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': passkey,
        },
      })

      if (res.ok) {
        setTransmissions((prev) => prev.filter((t) => t.id !== id))
        showNotification('Transmission permanently deleted.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const showNotification = (msg: string) => {
    setActionMessage(msg)
    setTimeout(() => setActionMessage(''), 3000)
  }

  const filteredTransmissions = transmissions.filter((t) => {
    if (filter === 'unread') return !t.read
    if (filter === 'read') return t.read
    return true
  })

  const unreadCount = transmissions.filter((t) => !t.read).length

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f2eee6] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f242e] font-mono text-xs text-[#8b949e]">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-[#f2eee6] transition-colors text-[#e1523d]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>&larr; Return to Public Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#10b981]" />
              <span>PRIVATE INBOX SUBSYSTEM</span>
            </span>
            <span>•</span>
            <span>STRICTLY CONFIDENTIAL</span>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="mx-auto max-w-md pt-12">
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-[#e1523d]/10 border border-[#e1523d]/30 flex items-center justify-center text-[#e1523d]">
                  <Lock className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-[#6b7280]">AUTH // VEDANT ONLY</span>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#f2eee6]">Transmission Terminal</h1>
                <p className="text-xs text-[#9ca3af] mt-1 font-light leading-relaxed">
                  Enter your master passkey to decrypt and inspect incoming transmissions. Visitors are never asked for this passkey.
                </p>
              </div>

              {authError && (
                <div className="flex items-center gap-2 rounded border border-[#ef4444]/40 bg-[#ef4444]/10 p-3 font-mono text-xs text-[#fca5a5]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#8b949e] block">Master Passkey</label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter passkey (default: vedant2026)"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded bg-[#e1523d] py-3 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="h-3.5 w-3.5" />
                      <span>Unlock Inbox</span>
                    </>
                  )}
                </button>
              </form>

              <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3 font-mono text-[11px] text-[#6b7280]">
                <span>Default development key: </span>
                <code className="text-[#e1523d]">vedant2026</code>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Inbox Console */
          <div className="space-y-8">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232832]">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#10b981]">
                  <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span>VEDANT TRANSMISSION ARCHIVE // ACTIVE SESSION</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-[#f2eee6] mt-1">
                  Private Inbox Telemetry
                </h1>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <button
                  onClick={() => fetchTransmissions(passkey)}
                  className="flex items-center gap-1.5 rounded border border-[#232832] bg-[#14171d] px-3 py-2 text-[#cfd6e0] hover:text-white hover:border-[#38404f] transition-colors"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"
                >
                  Lock &amp; Exit
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {actionMessage && (
              <div className="rounded border border-[#10b981]/40 bg-[#10b981]/10 px-4 py-2 font-mono text-xs text-[#a7f3d0]">
                {actionMessage}
              </div>
            )}

            {/* Metrics HUD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-[#232832] bg-[#14171d] p-4 space-y-1">
                <span className="text-[#8b949e] block text-[11px]">TOTAL TRANSMISSIONS</span>
                <span className="text-2xl font-bold text-[#f2eee6]">{transmissions.length}</span>
                <span className="text-[10px] text-[#6b7280] block">Logged to disk</span>
              </div>

              <div className="rounded-xl border border-[#232832] bg-[#14171d] p-4 space-y-1">
                <span className="text-[#8b949e] block text-[11px]">UNREAD INQUIRIES</span>
                <span
                  className={`text-2xl font-bold ${
                    unreadCount > 0 ? 'text-[#e1523d]' : 'text-[#10b981]'
                  }`}
                >
                  {unreadCount}
                </span>
                <span className="text-[10px] text-[#6b7280] block">Require review</span>
              </div>

              <div className="rounded-xl border border-[#232832] bg-[#14171d] p-4 space-y-1">
                <span className="text-[#8b949e] block text-[11px]">STORAGE ENGINE</span>
                <span className="text-base font-bold text-[#f59e0b] break-all">
                  data/transmissions.json
                </span>
                <span className="text-[10px] text-[#6b7280] block">Persistent local JSON</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-[#232832] pb-4 font-mono text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`rounded px-3 py-1.5 transition-colors ${
                  filter === 'all'
                    ? 'bg-[#e1523d] text-white font-semibold'
                    : 'bg-[#14171d] text-[#8b949e] hover:text-[#f2eee6]'
                }`}
              >
                All Transmissions ({transmissions.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`rounded px-3 py-1.5 transition-colors ${
                  filter === 'unread'
                    ? 'bg-[#e1523d] text-white font-semibold'
                    : 'bg-[#14171d] text-[#8b949e] hover:text-[#f2eee6]'
                }`}
              >
                Unread Only ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`rounded px-3 py-1.5 transition-colors ${
                  filter === 'read'
                    ? 'bg-[#e1523d] text-white font-semibold'
                    : 'bg-[#14171d] text-[#8b949e] hover:text-[#f2eee6]'
                }`}
              >
                Read ({transmissions.length - unreadCount})
              </button>
            </div>

            {/* Transmissions List */}
            {filteredTransmissions.length === 0 ? (
              <div className="rounded-xl border border-[#232832] bg-[#14171d] p-12 text-center space-y-3 font-mono text-xs text-[#8b949e]">
                <Inbox className="h-8 w-8 mx-auto text-[#4b5563]" />
                <p className="text-sm text-[#cfd6e0]">No transmissions match this filter.</p>
                <p className="text-[11px] text-[#6b7280]">
                  New messages submitted through /contact will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransmissions.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-xl border transition-all p-6 space-y-4 ${
                      !t.read
                        ? 'border-[#e1523d]/50 bg-[#161a22] shadow-[0_0_15px_rgba(225,82,61,0.08)]'
                        : 'border-[#232832] bg-[#14171d]'
                    }`}
                  >
                    {/* Top Row: Meta & Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1f242e] font-mono text-xs">
                      <div className="flex flex-wrap items-center gap-3">
                        {!t.read ? (
                          <span className="inline-flex items-center gap-1 rounded bg-[#e1523d]/20 px-2 py-0.5 text-[10px] text-[#e1523d] font-bold border border-[#e1523d]/40">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e1523d] animate-pulse" />
                            NEW TRANSMISSION
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-[#1f242e] px-2 py-0.5 text-[10px] text-[#8b949e]">
                            READ
                          </span>
                        )}
                        <span className="text-[#8b949e] flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(t.timestamp).toLocaleString()}</span>
                        </span>
                        <span className="text-[#4b5563]">ID: {t.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRead(t.id, t.read)}
                          className="flex items-center gap-1.5 rounded border border-[#232832] bg-[#090a0d] px-2.5 py-1 text-[11px] text-[#cfd6e0] hover:border-[#8b949e] transition-colors"
                        >
                          {t.read ? (
                            <>
                              <Circle className="h-3 w-3 text-[#e1523d]" />
                              <span>Mark Unread</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="rounded border border-[#ef4444]/30 bg-[#ef4444]/10 p-1.5 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"
                          title="Delete Transmission"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sender Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#e1523d]" />
                          <h3 className="text-base font-bold text-[#f2eee6]">{t.name}</h3>
                          <span className="text-[#6b7280]">&bull;</span>
                          <a
                            href={`mailto:${t.email}?subject=Re: ${encodeURIComponent(t.subject)}`}
                            className="text-xs font-mono text-[#3b68ff] hover:underline inline-flex items-center gap-1"
                          >
                            <span>{t.email}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <p className="text-sm font-semibold text-[#cfd6e0] mt-1 font-mono">
                          Subject: {t.subject}
                        </p>
                      </div>

                      <a
                        href={`mailto:${t.email}?subject=Re: ${encodeURIComponent(t.subject)}`}
                        className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-3 py-1.5 font-mono text-xs text-white hover:bg-[#ef634f] transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Reply Directly</span>
                      </a>
                    </div>

                    {/* Message Body */}
                    <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 text-xs font-mono text-[#dcd6c8] leading-relaxed whitespace-pre-wrap">
                      {t.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
