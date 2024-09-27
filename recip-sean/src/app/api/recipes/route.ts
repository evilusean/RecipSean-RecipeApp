import { NextResponse } from 'next/server'
import { getAllRecipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: Request) {
  try {
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

    console.log(`Found ${recipes.length} recipes for query: "${query}"`)
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error in GET /api/recipes:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}