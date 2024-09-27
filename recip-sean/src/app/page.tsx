'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SearchComponent } from '@/components/search'
import { Recipe } from '@/utils/recipeUtils'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async (query: string = '', type: string = '', nationality: string = '') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/recipes?search=${query}&type=${type}&nationality=${nationality}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string, type: string, nationality: string) => {
    fetchRecipes(query, type, nationality)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Recipe App</h1>
      <SearchComponent onSearch={handleSearch} />
      {loading ? (
        <p className="mt-8">Loading recipes...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                <p className="text-gray-600">{recipe.recipeType}</p>
                <p className="text-sm text-gray-500">Cooking Time: {recipe.cookingTime} minutes</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}