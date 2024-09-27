'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SearchComponent } from '@/components/search'

// Mock data - replace with actual data fetching logic
const mockRecipes = [
  { id: '1', name: 'Spaghetti Carbonara', recipeType: 'Italian' },
  { id: '2', name: 'Sushi Rolls', recipeType: 'Japanese' },
  { id: '3', name: 'Goulash', recipeType: 'Slovak' },
]

export default function Home() {
  const [recipes, setRecipes] = useState(mockRecipes)

  const handleSearch = (query: string) => {
    // Implement actual search logic here
    const filteredRecipes = mockRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query.toLowerCase())
    )
    setRecipes(filteredRecipes)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Recipe App</h1>
      <SearchComponent onSearch={handleSearch} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <p className="text-gray-600">{recipe.recipeType}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}