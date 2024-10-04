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
  
  export interface Instruction {
    time: number;
    en: string;
    sk: string;
    ja: string;
    primaryIngredient: string;
  }
  
  export interface NutritionalInformation {
    amount?: string;
    [key: string]: string | undefined;
  }