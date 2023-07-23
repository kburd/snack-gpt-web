import { useState } from 'react';
import { Form, Input, Button, Spinner, Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Recipe from './Recipe';
import WelcomeMessage from './WelcomeMessage';
import ErrorMessage from './ErrorMessage';
import NewRecipeMessage from './NewRecipeMessage';

function App() {

  const [recipe, setRecipe] = useState(null);
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showNewRecipeMessage, setShowNewRecipeMessage] = useState(false);


  function getRecipe(event) {

    event.preventDefault();
    setIsLoading(true);
    setRecipe(null)
    setIsError(false)

        // Set a timeout for the popup
    let timeoutId = setTimeout(() => {
      setShowNewRecipeMessage(true);
    }, 2000);

    fetch('https://abjb1atgc2.execute-api.us-east-2.amazonaws.com/test', {
      method: "POST",
      body: JSON.stringify({query: query})
    })
    .then(data => data.json())
    .then(response => {
      if(response.recipeFound){
        setRecipe(response.recipe)
      }
      else{
        throw Error(response.exception) 
      }
      setIsLoading(false)
      setQuery("")
      setShowNewRecipeMessage(false)
    })
    .catch(() => {
      setIsError(true)
      setIsLoading(false)
      setQuery("")
      setShowNewRecipeMessage(false)
    })

    return () => clearTimeout(timeoutId);

  }

  const onQueryInput = (event) => setQuery(event.target.value)

  return (
    <div className="App">
      <Navbar color="primary">
        <NavbarBrand className='font-weight-bold'>SnackGpt</NavbarBrand>
      </Navbar>
      <div className="app-content">
        {isLoading ? <Spinner color="primary"/> : null}
        {showNewRecipeMessage ? <NewRecipeMessage/> : null}
        {(recipe !== null) ? <Recipe {...recipe}/> : null}
        {(recipe === null && !isLoading && !isError) ? <WelcomeMessage/> : null}
        {isError ? <ErrorMessage/> : null}
      </div>
      <div className="navbar navbar-fixed-bottom">
        <Form onSubmit={getRecipe}>
          <Input type="text" id="query" placeholder="Enter a Food..." value={query} onInput={onQueryInput} disabled={isLoading}/>
          <Button color="primary" disabled={isLoading}>Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
