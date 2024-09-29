'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Shuffle } from 'lucide-react'
import { Recipe } from '@/utils/recipeUtils'

export default function RecipePage({ params }: { params: { slug: string[] } }) {
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
        const recipeSlug = params.slug.join('/')
        const response = await fetch(`/api/recipe/${recipeSlug}`)
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
  }, [params.slug])

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

  if (loading) {
    return <div className="container mx-auto px-4 py-6 sm:py-8 bg-tokyo-bg text-tokyo-fg">Loading...</div>
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8 bg-tokyo-bg text-tokyo-fg">
        <p className="text-tokyo-red">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-tokyo-red text-tokyo-bg rounded hover:bg-tokyo-red/80"
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

  const highlightMainIngredient = (text: string, ingredient: string) => {
    const parts = text.split(new RegExp(`(${ingredient})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === ingredient.toLowerCase() ? <strong key={index} className="text-tokyo-yellow">{part}</strong> : part
    );
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="min-h-screen bg-tokyo-bg text-tokyo-fg">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-tokyo-red">{recipe.name}</h1>
        <p className="text-tokyo-magenta mb-4">{capitalizeFirstLetter(recipe.recipeType)}</p>
        {recipe.favorite && (
          <p className="text-tokyo-yellow mb-4">⭐ Favorite</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-tokyo-cyan">Cooking Information</h2>
            <p className="text-sm sm:text-base"><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
            <p className="text-sm sm:text-base"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-tokyo-cyan">Ingredients</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm sm:text-base">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-tokyo-cyan">Utensils</h2>
            <ul className="list-disc list-inside">
              {recipe.utensils.map((utensil, index) => (
                <li key={index} className="text-sm sm:text-base">{utensil}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {recipe.notes && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-tokyo-cyan">Notes</h2>
            <p className="text-sm sm:text-base">{recipe.notes}</p>
          </div>
        )}

        {recipe.nutritionalInformation && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-tokyo-cyan">Nutritional Information</h2>
            {recipe.nutritionalInformation.amount && (
              <p className="text-sm sm:text-base mb-2">
                <strong>Amount:</strong> {recipe.nutritionalInformation.amount}
              </p>
            )}
            <ul className="list-disc list-inside">
              {Object.entries(recipe.nutritionalInformation).map(([key, value], index) => {
                if (key !== 'amount' && value !== undefined) {
                  return (
                    <li key={index} className="text-sm sm:text-base">
                      <strong>{capitalizeFirstLetter(key)}:</strong> {value}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}
        
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-tokyo-cyan">Instructions</h2>
          <Select onValueChange={(value: 'en' | 'sk' | 'ja') => setLanguage(value)}>
            <SelectTrigger className="w-full sm:w-[180px] mb-4 bg-tokyo-bg text-tokyo-fg border-tokyo-blue">
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
              <p className="font-bold mb-1 text-sm sm:text-base text-tokyo-green">
                Step {index + 1} - <span className="font-normal">Time: </span>
                <span className="text-tokyo-red">{instruction.time} minutes</span>
              </p>
              <p className="text-sm sm:text-base">
                {highlightMainIngredient(instruction[language] || instruction.en, instruction.primaryIngredient)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
  <Button 
    onClick={() => router.push('/')}
    className="bg-tokyo-red hover:bg-tokyo-red/80 text-tokyo-bg w-full sm:w-auto"
  >
    Back to Home
  </Button>
  <Button
    onClick={handleRandomRecipe}
    className="bg-tokyo-green hover:bg-tokyo-green/80 text-tokyo-bg w-full sm:w-auto"
  >
    <Shuffle className="mr-2 h-4 w-4" />
    Random Recipe
  </Button>
</div>
      </div>
    </div>
  )
}