'use client'

import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Shield, Key, RefreshCw, Sparkles, Activity } from 'lucide-react'

// Standard English Letter Frequencies (%)
const englishFreq: Record<string, number> = {
  A: 8.2, B: 1.5, C: 2.8, D: 4.3, E: 12.7, F: 2.2, G: 2.0,
  H: 6.1, I: 7.0, J: 0.15, K: 0.77, L: 4.0, M: 2.4, N: 6.7,
  O: 7.5, P: 1.9, Q: 0.09, R: 6.0, S: 6.3, T: 9.1, U: 2.8,
  V: 0.98, W: 2.4, X: 0.15, Y: 2.0, Z: 0.07,
}

export function CipherVisualizer() {
  const [cipherType, setCipherType] = useState<'caesar' | 'vigenere' | 'avalanche'>('caesar')
  const [plaintext, setPlaintext] = useState('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG AND BUILDS AUTONOMOUS AGENTS')
  const [caesarShift, setCaesarShift] = useState(3)
  const [vigenereKey, setVigenereKey] = useState('CIPHER')

  // Avalanche comparison strings
  const [avalancheA, setAvalancheA] = useState('SECURITY')
  const [avalancheB, setAvalancheB] = useState('SECURITX') // 1 character / bit difference

  // Encrypt text based on selected cipher
  const ciphertext = useMemo(() => {
    const text = plaintext.toUpperCase()

    if (cipherType === 'caesar') {
      return text
        .split('')
        .map((char) => {
          const code = char.charCodeAt(0)
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + caesarShift) % 26) + 65)
          }
          return char
        })
        .join('')
    }

    if (cipherType === 'vigenere') {
      const key = vigenereKey.toUpperCase().replace(/[^A-Z]/g, '') || 'A'
      let keyIndex = 0

      return text
        .split('')
        .map((char) => {
          const code = char.charCodeAt(0)
          if (code >= 65 && code <= 90) {
            const shift = key.charCodeAt(keyIndex % key.length) - 65
            keyIndex++
            return String.fromCharCode(((code - 65 + shift) % 26) + 65)
          }
          return char
        })
        .join('')
    }

    return text
  }, [plaintext, cipherType, caesarShift, vigenereKey])

  // Calculate character frequencies in ciphertext
  const frequencyData = useMemo(() => {
    const counts: Record<string, number> = {}
    let totalLetters = 0

    // Initialize all A-Z
    for (let i = 65; i <= 90; i++) {
      counts[String.fromCharCode(i)] = 0
    }

    for (const char of ciphertext) {
      if (counts[char] !== undefined) {
        counts[char]++
        totalLetters++
      }
    }

    return Object.keys(counts).map((char) => ({
      letter: char,
      'Ciphertext %': totalLetters > 0 ? Number(((counts[char] / totalLetters) * 100).toFixed(1)) : 0,
      'English Standard %': englishFreq[char] || 0,
    }))
  }, [ciphertext])

  // Simple pseudo hash avalanche calculator
  const avalancheMetrics = useMemo(() => {
    const toBinary = (str: string) =>
      str
        .split('')
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('')

    const binA = toBinary(avalancheA)
    const binB = toBinary(avalancheB)
    const maxLen = Math.max(binA.length, binB.length)

    let flippedBits = 0
    for (let i = 0; i < maxLen; i++) {
      if ((binA[i] || '0') !== (binB[i] || '0')) {
        flippedBits++
      }
    }

    const percentage = maxLen > 0 ? ((flippedBits / maxLen) * 100).toFixed(1) : '0'
    return { binA, binB, flippedBits, maxLen, percentage }
  }, [avalancheA, avalancheB])

  return (
    <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232832]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#f59e0b] font-semibold">// EXPERIMENT 02</span>
            <span className="text-[#6b7280]">CIPHERLAB INTERACTIVE WORKBENCH</span>
          </div>
          <h3 className="text-xl font-bold text-[#f2eee6] mt-1">
            Applied Cryptanalysis & Avalanche Diffusion Inspector
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1 max-w-xl">
            Live cryptographic inspection reflecting my Information Security & Data Forensics specialization. Test cipher vulnerabilities, frequency distributions, and entropy cascades.
          </p>
        </div>

        {/* Cipher Mode Switcher */}
        <div className="flex items-center gap-1 rounded border border-[#232832] bg-[#090a0d] p-1 font-mono text-xs">
          <button
            onClick={() => setCipherType('caesar')}
            className={`rounded px-3 py-1.5 transition-colors ${
              cipherType === 'caesar'
                ? 'bg-[#f59e0b] text-black font-semibold'
                : 'text-[#8b949e] hover:text-[#f2eee6]'
            }`}
          >
            Caesar Shift
          </button>
          <button
            onClick={() => setCipherType('vigenere')}
            className={`rounded px-3 py-1.5 transition-colors ${
              cipherType === 'vigenere'
                ? 'bg-[#f59e0b] text-black font-semibold'
                : 'text-[#8b949e] hover:text-[#f2eee6]'
            }`}
          >
            Vigenère
          </button>
          <button
            onClick={() => setCipherType('avalanche')}
            className={`rounded px-3 py-1.5 transition-colors ${
              cipherType === 'avalanche'
                ? 'bg-[#f59e0b] text-black font-semibold'
                : 'text-[#8b949e] hover:text-[#f2eee6]'
            }`}
          >
            Avalanche Effect
          </button>
        </div>
      </div>

      {cipherType !== 'avalanche' ? (
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-2 font-mono text-xs">
              <label className="text-[#8b949e] block">Plaintext Input Message</label>
              <textarea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                rows={2}
                className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-xs font-mono text-[#f2eee6] focus:border-[#f59e0b] focus:outline-none"
              />
            </div>

            <div className="md:col-span-4 space-y-2 font-mono text-xs">
              {cipherType === 'caesar' ? (
                <>
                  <div className="flex items-center justify-between text-[#8b949e]">
                    <span>Shift Key (K)</span>
                    <span className="text-[#f59e0b] font-bold">+{caesarShift} POSITIONS</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={caesarShift}
                    onChange={(e) => setCaesarShift(Number(e.target.value))}
                    className="w-full accent-[#f59e0b] cursor-pointer mt-4"
                  />
                  <span className="text-[10px] text-[#6b7280] block">
                    Shifts every letter alphabetically by {caesarShift} steps.
                  </span>
                </>
              ) : (
                <>
                  <label className="text-[#8b949e] block">Vigenère Keyword Key</label>
                  <input
                    type="text"
                    value={vigenereKey}
                    onChange={(e) => setVigenereKey(e.target.value.toUpperCase())}
                    className="w-full rounded border border-[#232832] bg-[#090a0d] p-2 text-xs font-mono text-[#f2eee6] focus:border-[#f59e0b] focus:outline-none uppercase"
                  />
                  <span className="text-[10px] text-[#6b7280] block">
                    Repeated polyalphabetic keyword for multi-shift mapping.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Ciphertext Output Box */}
          <div className="rounded-lg border border-[#232832] bg-[#090a0d] p-4 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-[#8b949e] text-[11px] pb-2 border-b border-[#1f242e]">
              <span className="text-[#f59e0b]">GENERATED CIPHERTEXT OUTPUT</span>
              <span>{ciphertext.length} CHARACTERS</span>
            </div>
            <p className="text-sm text-[#e4decb] tracking-wider break-all leading-relaxed">
              {ciphertext}
            </p>
          </div>

          {/* Frequency Histogram */}
          <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span>STATISTICAL CRYPTANALYSIS // LETTER FREQUENCY COMPARISON</span>
              <span className="text-[11px] text-[#6b7280]">
                Notice how monoalphabetic Caesar shifts the distribution unchanged!
              </span>
            </div>

            <div className="h-[240px] sm:h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={frequencyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid stroke="#1f242e" vertical={false} />
                  <XAxis dataKey="letter" stroke="#6b7280" fontSize={10} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#14171d',
                      borderColor: '#282e3b',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar dataKey="Ciphertext %" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="English Standard %" fill="#3b4252" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* Avalanche Effect Inspector */
        <div className="space-y-6 font-mono text-xs">
          <p className="text-xs text-[#9ca3af] font-sans">
            In secure modern cryptographic hash algorithms (like SHA-256), flipping a single bit in the input must cause at least 50% of the output bits to flip unpredictably (the Avalanche Effect).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[#8b949e] block">Message A</label>
              <input
                type="text"
                value={avalancheA}
                onChange={(e) => setAvalancheA(e.target.value)}
                className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-sm font-mono text-[#f2eee6] focus:border-[#f59e0b] focus:outline-none"
              />
              <div className="text-[10px] text-[#6b7280] break-all">
                Binary: {avalancheMetrics.binA.slice(0, 48)}...
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#8b949e] block">Message B (Modify 1 character)</label>
              <input
                type="text"
                value={avalancheB}
                onChange={(e) => setAvalancheB(e.target.value)}
                className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-sm font-mono text-[#f2eee6] focus:border-[#f59e0b] focus:outline-none"
              />
              <div className="text-[10px] text-[#6b7280] break-all">
                Binary: {avalancheMetrics.binB.slice(0, 48)}...
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#232832] bg-[#090a0d] p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-[10px] text-[#8b949e] block">TOTAL BITS COMPARED</span>
              <span className="text-2xl font-bold text-[#f2eee6]">{avalancheMetrics.maxLen} bits</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8b949e] block">FLIPPED BITS</span>
              <span className="text-2xl font-bold text-[#f59e0b]">{avalancheMetrics.flippedBits} bits</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8b949e] block">DIFFUSION VARIANCE</span>
              <span className="text-2xl font-bold text-[#10b981]">{avalancheMetrics.percentage}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
