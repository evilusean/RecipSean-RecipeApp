import { NextResponse } from 'next/server'
import { getAllRecipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('search')
  const type = searchParams.get('type')
  const nationality = searchParams.get('nationality')

  let recipes = getAllRecipes()

  if (query) {
    recipes = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase())) ||
      recipe.recipeType.toLowerCase().includes(query.toLowerCase())
    )
  }

  if (type) {
    recipes = recipes.filter(recipe => recipe.recipeType.toLowerCase() === type.toLowerCase())
  }

  if (nationality) {
    recipes = recipes.filter(recipe => {
      const recipePath = recipe.id.split('/')
      return recipePath[0].toLowerCase() === nationality.toLowerCase()
    })
  }

  return NextResponse.json(recipes)
}