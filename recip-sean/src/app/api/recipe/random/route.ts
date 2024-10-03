import { NextResponse } from 'next/server'
import { recipes } from '@/utils/recipeUtils'
import seedrandom from 'seedrandom'

let requestCounter = 0;

function generateSeed(): string {
  const timestamp = Date.now();
  const counter = requestCounter++;
  const randomValue = Math.random();
  
  // Combine multiple sources of entropy
  return `${timestamp}-${counter}-${randomValue}`;
}

function shuffleArray<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  if (recipes.length === 0) {
    return new NextResponse('No recipes found', { status: 404 })
  }

  // Generate a robust seed
  const seed = generateSeed();
  const rng = seedrandom(seed);

  // Shuffle the entire recipes array
  const shuffledRecipes = shuffleArray(recipes, rng);

  // Return the first recipe from the shuffled array
  return NextResponse.json(shuffledRecipes[0])
}