import { NextRequest, NextResponse } from 'next/server'
import { recipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('search') || ''

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const searchString = `${recipe.name} ${recipe.recipeType} ${recipe.ingredients.join(' ')} ${recipe.folder}`.toLowerCase()
    return searchString.includes(query.toLowerCase())
  })

  return NextResponse.json(filteredRecipes)
}