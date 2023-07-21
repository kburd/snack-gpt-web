
import './App.css';

function WelcomeMessage(props) {


  return (
    <div className='welcome'>
      <p className='welcome-title'>Welcome to SnackGpt!</p>
      <br/>
      <p className='welcome-subtitle'>Simply enter the name of a dish and we'll reccomend you a recipe!</p>
    </div>
  );
}

export default WelcomeMessage;
