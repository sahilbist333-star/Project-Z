import { GoogleGenerativeAI } from '@google/generative-ai'
import { Opportunity } from './types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

interface GeminiOpportunity {
    title: string
    demand_score: number
    confidence: number
    priority: string
    mentions_estimate: number
    problem_summary: string
    proposed_solution: string
    engineering_effort: string
    customer_quotes: string[]
}

interface GeminiResponse {
    opportunities: GeminiOpportunity[]
}

export async function analyzeWithGemini(
    entries: string[]
): Promise<Omit<Opportunity, 'id' | 'analysis_id' | 'created_at'>[]> {
    const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3,
        },
    })

    const feedbackText = entries
        .slice(0, 300) // safety cap for token limits
        .map((e, i) => `${i + 1}. ${e}`)
        .join('\n')

    const prompt = `You are a product intelligence analyst. Analyze the following customer feedback entries and identify the top product opportunities.

FEEDBACK DATA (${entries.length} total entries):
${feedbackText}

Return a JSON object with an "opportunities" array. Each opportunity must include:
- title: Short, specific feature or improvement name
- demand_score: Number from 0-10 based on frequency and urgency 
- confidence: Integer 0-100 representing evidence strength
- priority: One of "P0", "P1", "P2", "P3"
- mentions_estimate: Estimated number of entries mentioning this theme
- problem_summary: 2-3 sentence description of the user pain point
- proposed_solution: 2-3 sentence description of the proposed product solution
- engineering_effort: Estimated effort like "1-2 weeks", "2-4 weeks", "1-2 months"
- customer_quotes: Array of 3-5 VERBATIM quotes from the feedback above. Select exact text, do NOT rewrite or paraphrase.

Rules:
- Return 5-8 opportunities sorted by demand_score descending
- customer_quotes MUST be exact text from the input, not summaries
- demand_score must be a number (float), not a string
- All fields are required

Return ONLY valid JSON, no markdown, no explanation.`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Strict JSON validation
    let parsed: GeminiResponse
    try {
        parsed = JSON.parse(text)
    } catch {
        throw new Error(`Gemini returned invalid JSON: ${text.substring(0, 200)}`)
    }

    if (!Array.isArray(parsed.opportunities) || parsed.opportunities.length === 0) {
        throw new Error('Gemini response missing opportunities array')
    }

    // Validate and normalize each opportunity
    return parsed.opportunities.map((opp: GeminiOpportunity) => {
        if (!opp.title || typeof opp.demand_score !== 'number') {
            throw new Error(`Malformed opportunity: ${JSON.stringify(opp).substring(0, 100)}`)
        }
        return {
            title: opp.title,
            demand_score: Math.min(10, Math.max(0, opp.demand_score)),
            confidence: Math.min(100, Math.max(0, opp.confidence || 70)),
            priority: opp.priority || 'P2',
            mentions_estimate: opp.mentions_estimate || 0,
            problem_summary: opp.problem_summary || '',
            proposed_solution: opp.proposed_solution || '',
            engineering_effort: opp.engineering_effort || 'TBD',
            customer_quotes: Array.isArray(opp.customer_quotes) ? opp.customer_quotes.slice(0, 5) : [],
        }
    })
}
