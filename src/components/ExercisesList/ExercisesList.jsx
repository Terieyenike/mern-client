/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import style from '../../styles.module.css';
// import { PageHeader } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.exercise._id} className={style.tdlink}>
        edit
      </Link>{' '}
      |{' '}
      <a
        href='#'
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
        className={style.tdlink}>
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8001/exercises/')
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete('http://localhost:8001/exercises/' + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <Section>
        <div className={style.container}>
          <h3>Logged Exercises</h3>
          <div className='table-responsive-sm'>
            <table className='table table-dark table-hover'>
              <thead className='thead-light'>
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.exerciseList()}</tbody>
            </table>
          </div>
        </div>
      </Section>
    );
  }
}

const Section = styled.section`
  padding: 1em 0;
  table {
    width: 100%;
  }
`;
