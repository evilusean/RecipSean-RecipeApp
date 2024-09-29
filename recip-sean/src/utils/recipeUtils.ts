import fs from 'fs';
import path from 'path';

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
  notes?: string;
  nutritionalInformation?: NutritionalInformation;
}

interface Instruction {
  time: number;
  en: string;
  sk: string;
  ja: string;
  primaryIngredient: string;
}

interface NutritionalInformation {
  amount?: string;
  [key: string]: string | undefined;
}

export function getAllRecipes(): Recipe[] {
  const recipesDir = path.join(process.cwd(), 'src/recipes');
  return getRecipesFromDir(recipesDir);
}

function getRecipesFromDir(dir: string, baseDir: string = dir): Recipe[] {
  let recipes: Recipe[] = [];
  let items: string[];

  try {
    items = fs.readdirSync(dir);
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return recipes;
  }

  for (const item of items) {
    const fullPath = path.join(dir, item);
    let stat: fs.Stats;

    try {
      stat = fs.statSync(fullPath);
    } catch (error) {
      console.error(`Error getting file stats for ${fullPath}:`, error);
      continue;
    }

    if (stat.isDirectory()) {
      recipes = recipes.concat(getRecipesFromDir(fullPath, baseDir));
    } else if (path.extname(item) === '.json') {
      try {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const recipe: Recipe = JSON.parse(fileContent);
        recipe.folder = path.relative(baseDir, dir);
        recipe.id = path.basename(item, '.json');
        recipes.push(recipe);
      } catch (error) {
        console.error(`Error parsing JSON file ${fullPath}:`, error);
      }
    }
  }

  return recipes;
}

export const recipes: Recipe[] = getAllRecipes();

// Log the number of recipes loaded
console.log(`Loaded ${recipes.length} recipes`);