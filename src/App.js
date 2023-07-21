import { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';
import './App.css';
import Recipe from './Recipe';

function App() {

  const [recipe, setRecipe] = useState(null);
  const [query, setQuery] = useState();

  function getRecipe(event) {

    event.preventDefault();

    fetch('https://abjb1atgc2.execute-api.us-east-2.amazonaws.com/test', {
      method: "POST",
      body: JSON.stringify({query: query})
    })
    .then(data => data.json())
    .then(setRecipe)

  }

  const onQueryChange = (event) => setQuery(event.target.value)

  return (
    <div className="App">
      <h1>SnackGPT</h1>
      <Form onSubmit={getRecipe}>
        <Input type="text" id="query" placeholder="Enter a Food..." onChange={onQueryChange}/>
        <Button color="primary">Submit</Button>
      </Form>
      {(recipe !== null) ? <Recipe {...recipe}/> : null}
    </div>
  );
}

export default App;
