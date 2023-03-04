import { createContext, useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "../css/app.css";
import { v4 as uuidv4 } from 'uuid'

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes"

function App() {
  const [selectedRecipeId, setSelectedId] = useState();
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON == null) {
      return sampleRecipes
    } else {
      return JSON.parse(recipeJSON)
    }
  });

  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    return () => console.log("recipes set")
  }, [recipes])


  const handleRecipeSelect = (id) => {
    setSelectedId(id)
  }

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: ""
        }
      ]
    }
  
    setSelectedId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  const handleRecipeDelete = (id) => {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
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
