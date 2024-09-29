import { NextRequest, NextResponse } from 'next/server'
import { getAllRecipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('search') || ''

  try {
    const allRecipes = getAllRecipes()
    console.log('Total recipes fetched:', allRecipes.length) // Add this log

    const filteredRecipes = allRecipes.filter((recipe: Recipe) => {
      const searchString = `${recipe.name} ${recipe.recipeType} ${recipe.ingredients.join(' ')}`.toLowerCase()
      return searchString.includes(query.toLowerCase())
    })

    console.log('Filtered recipes:', filteredRecipes.length) // Add this log

    return NextResponse.json(filteredRecipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}