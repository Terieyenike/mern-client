import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../styles.module.css';

export const Exercise = ({ exercise, deleteExercise }) => {
  return (
    <>
      <tr>
        <td>
          {exercise.username.charAt(0).toUpperCase() +
            exercise.username.slice(1)}
        </td>
        <td>
          {exercise.description.charAt(0).toUpperCase() +
            exercise.description.slice(1)}
        </td>
        <td>{exercise.duration}</td>
        <td>{exercise.date.substring(0, 10)}</td>
        <td>
          <Link to={`/edit/${exercise._id}`}>edit</Link> |{' '}
          <button
            className={style.btn}
            onClick={() => deleteExercise(exercise._id)}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};
