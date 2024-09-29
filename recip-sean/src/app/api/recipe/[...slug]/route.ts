import { NextRequest, NextResponse } from 'next/server'
import { recipes, Recipe } from '@/utils/recipeUtils'

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const recipe = recipes.find((r: Recipe) => `${r.folder}/${r.id}` === slug)

  if (recipe) {
    return NextResponse.json(recipe)
  } else {
    return new NextResponse('Recipe not found', { status: 404 })
  }
}