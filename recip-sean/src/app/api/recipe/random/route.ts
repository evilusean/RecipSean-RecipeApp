import { NextResponse } from 'next/server'
import { recipes } from '@/utils/recipeUtils'
import seedrandom from 'seedrandom'

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

  // Seed the RNG with the current timestamp
  const seed = Date.now().toString();
  const rng = seedrandom(seed);

  // Shuffle the entire recipes array
  const shuffledRecipes = shuffleArray(recipes, rng);

  // Return the first recipe from the shuffled array
  return NextResponse.json(shuffledRecipes[0])
}