import fs from 'fs'
import path from 'path'

export interface Recipe {
  id: string;
  folder: string;
  name: string;
  recipeType: string;
  favorite: boolean;
  ingredients: string[];
  utensils: string[];
  prepTime: number;
  cookingTime: number;
  instructions: Instruction[];
}

interface Instruction {
  time: number;
  en: string;
  sk: string;
  ja: string;
  primaryIngredient: string;
}
export function getAllRecipes(): Recipe[] {
  const recipesDir = path.join(process.cwd(), 'src', 'recipes')
  return readRecipesInDir(recipesDir) as Recipe[]
}

export function readRecipesInDir(dir: string): any[] {
  const recipes: any[] = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      recipes.push(...readRecipesInDir(filePath));
    } else if (path.extname(file) === '.json') {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log(`Reading file: ${filePath}`);
        console.log(`File content: ${content}`);
        const recipe = JSON.parse(content);
        recipes.push(recipe);
      } catch (error) {
        console.error(`Error reading or parsing file ${filePath}:`, error);
      }
    }
  }
  
  return recipes;
}