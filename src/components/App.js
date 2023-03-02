import { createContext, useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "../css/app.css";
import { v4 as uuidv4 } from 'uuid'

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes"

function App() {

  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON == null) {
      return sampleRecipes
    } else {
      return JSON.parse(recipeJSON)
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    return () => console.log("recipes set")
  }, [recipes])


  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: "Instr.",
      ingredients: [
        {
          id: uuidv4(),
          name: "name",
          amount: "1tbsp"
        }
      ]
    }
  
    setRecipes([...recipes, newRecipe])
  }

  const handleRecipeDelete = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      <RecipeEdit />
    </RecipeContext.Provider>
    
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    cookTime: "1:45",
    servings: 3,
    instructions: "1. Put salt on chicken\n2.Put chicken in oven\n3.Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 pounds"
      },
      {
        id: 2,
        name: "Salt",
        amount: "1Tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Plain Pork",
    cookTime: "0:45",
    servings: 5,
    instructions: "1. Put paprika on pork\n2.Put chicken in oven\n3.Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 pounds"
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2Tbs"
      }
    ]
  }
]

export default App;
