import React, {useEffect, useState} from 'react'
import './App.css';
import Recipe from './Recipe';

const App = () => {
    
    const APP_ID ='a57e27b4'; 
    const APP_KEY = '3af2a05f861494acb2cab95a5f57366c';
    const exReq = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=a57e27b4&app_key=3af2a05f861494acb2cab95a5f57366c';
    
    
    const [recipes, setRecipes]= useState([]);
    const [search, setSearch]= useState('');
    const [query, setQuery]= useState('query');
    
    useEffect(() => {
        getRecipe();
    }, [query]);
    
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };
    
    const updateSearch = e => {
        setSearch(e.target.value);
    }
    
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }
    
  return (
    <div className="App">
      <form className= "search-form" onSubmit={getSearch} >
        <input className="search-bar" type= "text" value= {search} onChange={updateSearch} />
        <button className="search-button" type= "submit" >Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
            <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories} 
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
            />
        ))}
        </div>
    </div>
  );
}

export default App;
