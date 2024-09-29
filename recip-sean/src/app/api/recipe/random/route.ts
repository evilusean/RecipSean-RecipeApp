import { NextResponse } from 'next/server'
import { recipes } from '@/utils/recipeUtils'

export async function GET() {
  if (recipes.length === 0) {
    return new NextResponse('No recipes found', { status: 404 })
  }

  const randomIndex = Math.floor(Math.random() * recipes.length)
  const randomRecipe = recipes[randomIndex]

  return NextResponse.json(randomRecipe)
}