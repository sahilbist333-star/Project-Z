import { SAMPLE_FEEDBACK } from './sample-data'
import crypto from 'crypto'

export function cleanInput(raw: string): string[] {
    const lines = raw.split('\n')
    const seen = new Set<string>()
    const cleaned: string[] = []
    for (const line of lines) {
        const t = line.trim()
        const lower = t.toLowerCase()
        if (t.length < 5) continue
        if (seen.has(lower)) continue
        seen.add(lower)
        cleaned.push(t)
    }
    return cleaned
}

export function hashInput(cleaned: string[]): string {
    return crypto
        .createHash('sha256')
        .update(cleaned.join('\n').toLowerCase())
        .digest('hex')
}

export function getSampleInput(): string[] {
    return SAMPLE_FEEDBACK
}

export function minutesSince(date: string | Date): number {
    return (Date.now() - new Date(date).getTime()) / 60000
}

export function daysSince(date: string | Date): number {
    return (Date.now() - new Date(date).getTime()) / 86400000
}
