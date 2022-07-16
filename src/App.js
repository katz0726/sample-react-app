import './App.css';
import PropTypes from 'prop-types';

function App() {
  const users = [
    { name: 'Zero', age: 45 },
    { name: 'Jack', age: 35 },
    { name: 'The Boss' }
  ]

  return (
    <div>
      {
        users.map((user, index) => { 
          return <User name={user.name} age={user.age} key={index} />
        })
      }
    </div>
  );
}

const User = (props) => {
  return <div>Hi, I'm {props.name}, and {props.age} years old! </div>
}

User.defaultProps = {
  age: 1
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired

}

export default App;
