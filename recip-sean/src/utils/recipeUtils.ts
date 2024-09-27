import fs from 'fs'
import path from 'path'

export interface Recipe {
  id: string
  name: string
  ingredients: string[]
  utensils: string[]
  cookingTime: number
  prepTime: number
  instructions: {
    time: number
    en: string
    sk?: string
    ja?: string
    primaryIngredient: string
  }[]
  favorite: boolean
  recipeType: string
}

export function getAllRecipes(): Recipe[] {
  const recipesDir = path.join(process.cwd(), 'src', 'recipes')
  const recipes: Recipe[] = []

  function readRecipesInDir(dir: string) {
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const fullPath = path.join(dir, item)
      if (fs.statSync(fullPath).isDirectory()) {
        readRecipesInDir(fullPath)
      } else if (path.extname(fullPath) === '.json') {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const recipe: Recipe = JSON.parse(fileContents)
        recipes.push(recipe)
      }
    }
  }

  readRecipesInDir(recipesDir)
  return recipes
}