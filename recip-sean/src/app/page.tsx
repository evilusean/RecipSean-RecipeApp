'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SearchComponent } from '@/components/search'
import { Recipe } from '@/utils/recipeUtils'
import { debounce } from 'lodash'
import { Button } from "@/components/ui/button"
import { Shuffle } from 'lucide-react'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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

  const handleRandomRecipe = async () => {
    try {
      const response = await fetch('/api/recipe/random')
      if (!response.ok) {
        throw new Error('Failed to fetch random recipe')
      }
      const randomRecipe = await response.json()
      router.push(`/recipe/${randomRecipe.folder}/${randomRecipe.id}`)
    } catch (error) {
      console.error('Error fetching random recipe:', error)
    }
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="min-h-screen bg-tokyo-bg text-tokyo-fg">
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-tokyo-red text-center">RecipSean</h1>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 mb-6">
        <div className="w-full sm:w-1/2 flex flex-col sm:flex-row sm:space-x-4">
          <Button
            onClick={handleRandomRecipe}
            className="bg-tokyo-green hover:bg-tokyo-green/80 text-tokyo-bg w-full sm:w-auto mb-4 sm:mb-0"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Random RecipSean
          </Button>
          <div className="w-full">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </div>
      </div>
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