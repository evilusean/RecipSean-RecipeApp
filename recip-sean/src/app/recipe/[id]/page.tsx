'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Recipe } from '@/utils/recipeUtils'

export default function RecipePage({ params }: { params: { id: string | string[] } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [language, setLanguage] = useState<'en' | 'sk' | 'ja'>('en')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true)
      setError(null)
      try {
        const recipeId = Array.isArray(params.id) ? params.id.join('/') : params.id
        const response = await fetch(`/api/recipes/${recipeId}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Recipe not found')
          }
          throw new Error('Failed to fetch recipe')
        }
        const data = await response.json()
        setRecipe(data)
      } catch (error) {
        console.error('Error fetching recipe:', error)
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto px-4 py-6 sm:py-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
    )
  }

  if (!recipe) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">{recipe.name}</h1>
      <p className="text-gray-600 mb-4">{recipe.recipeType}</p>
      {recipe.favorite && (
        <p className="text-yellow-500 mb-4">⭐ Favorite</p>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-sm sm:text-base">{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Utensils</h2>
        <ul className="list-disc list-inside">
          {recipe.utensils.map((utensil, index) => (
            <li key={index} className="text-sm sm:text-base">{utensil}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Cooking Information</h2>
        <p className="text-sm sm:text-base"><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
        <p className="text-sm sm:text-base"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      </div>
      
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Instructions</h2>
        <Select onValueChange={(value: 'en' | 'sk' | 'ja') => setLanguage(value)}>
          <SelectTrigger className="w-full sm:w-[180px] mb-4">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="sk">Slovak</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
          </SelectContent>
        </Select>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold mb-1 text-sm sm:text-base">Step {index + 1} - <span className="font-normal">Time: {instruction.time} minutes</span></p>
            <p className="text-sm sm:text-base">
              {instruction[language] || instruction.en}
              {' '}
              <strong>({instruction.primaryIngredient})</strong>
            </p>
          </div>
        ))}
      </div>
      
      <button 
        className="mt-6 sm:mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </div>
  )
}