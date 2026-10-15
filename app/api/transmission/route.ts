import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'transmissions.json')
const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'vedant2026'

interface Transmission {
  id: string
  timestamp: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
}

async function readTransmissions(): Promise<Transmission[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading transmissions:', error)
    return []
  }
}

async function writeTransmissions(list: Transmission[]): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing transmissions:', error)
    return false
  }
}

function verifyAdminAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  const customKey = req.headers.get('x-admin-key')

  if (customKey === ADMIN_PASSKEY) return true
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    if (token === ADMIN_PASSKEY) return true
  }

  // Also allow cookie check
  const cookieKey = req.cookies.get('admin_key')?.value
  if (cookieKey === ADMIN_PASSKEY) return true

  return false
}

// POST: Public submission of a new transmission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const transmissions = await readTransmissions()

    const newTransmission: Transmission = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 150),
      subject: (subject || 'Direct Portfolio Transmission').trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
      read: false,
    }

    // Prepend latest message first
    transmissions.unshift(newTransmission)
    const success = await writeTransmissions(transmissions)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to write transmission to store.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, id: newTransmission.id, timestamp: newTransmission.timestamp },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/transmission error:', error)
    return NextResponse.json(
      { error: 'Internal server error processing transmission.' },
      { status: 500 }
    )
  }
}

// GET: Private retrieval of transmissions (Admin only)
export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required.' },
      { status: 401 }
    )
  }

  const transmissions = await readTransmissions()
  return NextResponse.json({ transmissions, total: transmissions.length })
}

// PATCH: Mark a transmission as read / unread (Admin only)
export async function PATCH(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required.' },
      { status: 401 }
    )
  }

  try {
    const { id, read } = await req.json()
    const transmissions = await readTransmissions()
    const target = transmissions.find((t) => t.id === id)

    if (!target) {
      return NextResponse.json({ error: 'Transmission not found' }, { status: 404 })
    }

    target.read = Boolean(read)
    await writeTransmissions(transmissions)

    return NextResponse.json({ success: true, transmission: target })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transmission' }, { status: 500 })
  }
}

// DELETE: Delete a transmission (Admin only)
export async function DELETE(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required.' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    let transmissions = await readTransmissions()
    const initialLen = transmissions.length
    transmissions = transmissions.filter((t) => t.id !== id)

    if (transmissions.length === initialLen) {
      return NextResponse.json({ error: 'Transmission not found' }, { status: 404 })
    }

    await writeTransmissions(transmissions)
    return NextResponse.json({ success: true, remaining: transmissions.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transmission' }, { status: 500 })
  }
}
