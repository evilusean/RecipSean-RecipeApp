import { NextRequest, NextResponse } from 'next/server'
import { recipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('search') || ''

  console.log('Total recipes:', recipes.length) // Log total recipes

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const searchString = `${recipe.name} ${recipe.recipeType} ${recipe.ingredients.join(' ')} ${recipe.folder}`.toLowerCase()
    return searchString.includes(query.toLowerCase())
  })

  console.log('Filtered recipes:', filteredRecipes.length) // Log filtered recipes

  return NextResponse.json(filteredRecipes)
}

export const dynamic = 'force-static'