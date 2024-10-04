import { NextResponse } from 'next/server'
import { getRandomRecipe } from '@/utils/recipeUtils'

export const dynamic = 'force-static'

export function GET() {
  const randomRecipe = getRandomRecipe();

  if (!randomRecipe) {
    return new NextResponse('No recipes found', { status: 404 })
  }

  return NextResponse.json(randomRecipe)
}