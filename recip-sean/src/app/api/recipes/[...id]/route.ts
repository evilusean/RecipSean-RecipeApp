import { NextResponse } from 'next/server'
import { getAllRecipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('search')?.toLowerCase() || ''

  let recipes = getAllRecipes()

  if (query) {
    recipes = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query) ||
      recipe.id.toLowerCase().includes(query) ||
      recipe.recipeType.toLowerCase().includes(query) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) ||
      (query === 'favorite' && recipe.favorite === true)
    )
  }

  return NextResponse.json(recipes)
}