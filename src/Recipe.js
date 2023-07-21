
import { Card, CardHeader, CardText } from 'reactstrap';
import './App.css';

function Recipe(props) {


  return (
    <div class="recipe">
      <h2>{props.name} Recipe</h2>
      <div className='recipe-body'>
        <Card>
          <CardHeader tag="h3">Ingredients</CardHeader>
          <CardText>
            <ul>{props.ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
          </CardText>
        </Card>
        <Card>
          <CardHeader tag="h3">Steps</CardHeader>
          <CardText>
            <ol>{props.steps.map(step => <li>{step}</li>)}</ol>
          </CardText>
        </Card>
      </div>
    </div>
  );
}

export default Recipe;
