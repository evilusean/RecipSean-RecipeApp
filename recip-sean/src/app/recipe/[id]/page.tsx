'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Recipe } from '@/utils/recipeUtils'

export default function RecipePage({ params }: { params: { id: string[] } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [language, setLanguage] = useState<'en' | 'sk' | 'ja'>('en')

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id.join('/')}`)
        if (!response.ok) {
          throw new Error('Failed to fetch recipe')
        }
        const data = await response.json()
        setRecipe(data)
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }

    fetchRecipe()
  }, [params.id])

  if (!recipe) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
      <p className="text-gray-600 mb-4">{recipe.recipeType}</p>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Utensils</h2>
        <ul className="list-disc list-inside">
          {recipe.utensils.map((utensil, index) => (
            <li key={index}>{utensil}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cooking Information</h2>
        <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <Select onValueChange={(value: 'en' | 'sk' | 'ja') => setLanguage(value)}>
          <SelectTrigger className="w-[180px] mb-4">
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
            <p className="font-bold mb-1">Step {index + 1} - <span className="font-normal">Time: {instruction.time} minutes</span></p>
            <p>
              {instruction[language] || instruction.en}
              {' '}
              <strong>({instruction.primaryIngredient})</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}