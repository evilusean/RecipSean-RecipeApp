import { NextRequest, NextResponse } from 'next/server'
import { getAllRecipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  console.log('Requested slug:', slug)

  const recipes = getAllRecipes()
  console.log('Total recipes:', recipes.length)

  const recipe = recipes.find((r: Recipe) => {
    const recipeSlug = `${r.folder}/${r.id}`.replace(/\\/g, '/')
    console.log('Comparing:', recipeSlug, 'with', slug)
    return recipeSlug === slug
  })

  if (recipe) {
    console.log('Recipe found:', recipe.name)
    return NextResponse.json(recipe)
  } else {
    console.log('Recipe not found')
    return new NextResponse('Recipe not found', { status: 404 })
  }
}