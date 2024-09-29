'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { SearchComponent } from '@/components/search'
import { Recipe } from '@/utils/recipeUtils'
import { debounce } from 'lodash'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = useCallback(async (query: string = '') => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/recipe?search=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      // Sort recipes: favorites first, then alphabetically by name
      const sortedRecipes = data.sort((a: Recipe, b: Recipe) => {
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;
        return a.name.localeCompare(b.name);
      });
      setRecipes(sortedRecipes)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setError('Failed to fetch recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchRecipes(query)
    }, 300),
    [fetchRecipes]
  )

  const handleSearch = (query: string) => {
    debouncedSearch(query)
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="min-h-screen bg-tokyo-bg text-tokyo-fg">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-tokyo-red text-center">RecipSean</h1>
        <SearchComponent onSearch={handleSearch} />
        {loading && <p className="mt-6 sm:mt-8">Loading recipes...</p>}
        {error && <p className="mt-6 sm:mt-8 text-tokyo-red">{error}</p>}
        {!loading && !error && (
          <div className="mt-6 sm:mt-8">
            {recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recipes.map(recipe => (
                  <Link href={`/recipe/${recipe.folder}/${recipe.id}`} key={`${recipe.folder}/${recipe.id}`}>
                    <div className="border border-tokyo-blue rounded-lg p-4 hover:bg-tokyo-blue hover:bg-opacity-10 transition-colors">
                      <h2 className="text-lg sm:text-xl font-semibold text-tokyo-red">{recipe.name}</h2>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-tokyo-magenta text-sm sm:text-base">{capitalizeFirstLetter(recipe.recipeType)}</p>
                        {recipe.favorite && (
                          <p className="text-tokyo-blue">⭐ Favorite</p>
                        )}
                      </div>
                      <p className="text-sm text-tokyo-green mt-2">Cooking Time: {recipe.cookingTime} minutes</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 sm:mt-8 text-center text-tokyo-fg">No recipes found. Try a different search term.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}