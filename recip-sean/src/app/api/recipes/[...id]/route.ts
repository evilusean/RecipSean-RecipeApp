import { NextResponse } from 'next/server'
import { getAllRecipes } from '@/utils/recipeUtils'

export async function GET(request: Request, { params }: { params: { id: string[] } }) {
  try {
    const recipes = getAllRecipes()
    const recipeId = params.id.join('/')
    const recipe = recipes.find(r => r.id === recipeId)

    if (recipe) {
      return NextResponse.json(recipe)
    } else {
      return new NextResponse('Recipe not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}