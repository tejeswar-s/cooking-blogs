import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';

//styles
import './Search.css';

export default function Search() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q')?.toLowerCase(); // Normalize query for case-insensitive search

    // Fetch all recipes from the API
    const url = `http://localhost:3000/recipes`;
    const { data, isPending, error } = useFetch(url);

    // Filter recipes based on title, method, or ingredients
    const filteredData = data
        ? data.filter(recipe => {
            return (
                recipe.title.toLowerCase().includes(query) ||
                recipe.method.toLowerCase().includes(query) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
            );
        })
        : [];

    return (
        <div className="search-page">
            <h2 className="page-title">
                Recipes including "{query}" ...
            </h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && filteredData.length === 0 && (
                <p className="error" style={{textAlign: "center"}}>No recipes found matching "{query}".</p>
            )}
            {filteredData.length > 0 && <RecipeList recipes={filteredData} />}
        </div>
    );
}
