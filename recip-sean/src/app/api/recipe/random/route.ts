import { NextResponse } from 'next/server'
import { recipes } from '@/utils/recipeUtils'

export function GET() {
  if (recipes.length === 0) {
    return new NextResponse('No recipes found', { status: 404 })
  }

  return NextResponse.json(recipes)
}

export const dynamic = 'force-static'