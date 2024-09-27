import { NextResponse } from 'next/server'
import { getAllRecipes } from '@/utils/recipeUtils'

export async function GET(request: Request, { params }: { params: { id: string[] } }) {
  const recipes = getAllRecipes()
  const recipe = recipes.find(r => r.id === params.id.join('/'))

  if (recipe) {
    return NextResponse.json(recipe)
  } else {
    return new NextResponse('Recipe not found', { status: 404 })
  }
}