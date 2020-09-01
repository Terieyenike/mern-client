import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { CreateExercise } from './components/CreateExercise/CreateExercise';
import ExercisesList from './components/ExercisesList/ExercisesList';
import { CreateUser } from './components/CreateUser/CreateUser';
import EditExercise from './components/EditExercise/EditExercise';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/' exact component={ExercisesList} />
        <Route path='/create' component={CreateExercise} />
        <Route path='/user' component={CreateUser} />
        <Route path='/edit/:id' component={EditExercise} />
      </Switch>
    </div>
  );
}

export default App;
