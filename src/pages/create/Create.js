import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme' // Import the theme hook

// styles
import './Create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef();
  const navigate = useNavigate();

  const { postData, isPending, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const { color, mode } = useTheme(); // Get the current theme mode

  const handleSubmit = (e) => {
    e.preventDefault()
    const recipe = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes'
    }

    postData(recipe);
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => ([...prevIngredients, newIngredient]))
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  useEffect(() => {
    if (data) {
      navigate('/')
    }
  }, [data, navigate])

  return (
    <div className={`create ${mode}`}> {/* Apply dark mode class dynamically */}
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button type="button" style={{background : color}} onClick={handleAdd}>Add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(ing => (
          <span key={ing}>{ing}, </span>
        ))}</p>

        <label>
          <span>Recipe Method:</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input 
            type="number" 
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required 
          />
        </label>

        <button className="btn" disabled={isPending} style={{background : color}}>
          {isPending && "submitting"}
          {!isPending && "submit"}
        </button>
      </form>
    </div>
  )
}
