import { NextResponse } from 'next/server'
import { recipes } from '@/utils/recipeUtils'
import crypto from 'crypto'

let counter = 0

function generateSeed(): string {
  const timestamp = Date.now().toString()
  const randomBytes = crypto.randomBytes(8).toString('hex')
  counter = (counter + 1) % 1000000 // Cycle through 0-999999
  return `${timestamp}-${randomBytes}-${counter}`
}

function shuffleArray<T>(array: T[], seed: string): T[] {
  const shuffled = [...array]
  const rng = crypto.createHash('sha256').update(seed).digest()
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng[i % 32] % (i + 1) // Use each byte of the hash as our random source
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

export async function GET() {
  if (recipes.length === 0) {
    return new NextResponse('No recipes found', { status: 404 })
  }

  const seed = generateSeed()
  const shuffledRecipes = shuffleArray(recipes, seed)

  return NextResponse.json(shuffledRecipes[0])
}