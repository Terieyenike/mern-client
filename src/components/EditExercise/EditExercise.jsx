import React from 'react';
import styled from 'styled-components';
import style from '../../styles.module.css';
import { PageHeader, Input, DatePicker, Space } from 'antd';
import axios from 'axios';

export default class EditExercise extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://lit-escarpment-62322.herokuapp.com/exercises/' +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('https://lit-escarpment-62322.herokuapp.com/users/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios
      .post(
        'https://lit-escarpment-62322.herokuapp.com/exercises/update/' +
          this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <>
        <Section>
          <div className={style.container}>
            <PageHeader title='Edit Exercise Log' />
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label>Username:</label>
                <div>
                  <select
                    style={{
                      width: '100%',
                      padding: '.5em 0',
                      textIndent: '10px',
                    }}
                    required
                    className='form-control'
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {this.state.users.map((user) => {
                      return (
                        <option key={user} value={user}>
                          {user.charAt(0).toUpperCase() + user.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className='form-group'>
                <label>Description:</label>
                <div>
                  <Input
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group'>
                <label>Duration (in minutes):</label>
                <div>
                  <Input
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group'>
                <label>Date:</label>
                <div>
                  <Space direction='vertical' size={12}>
                    <DatePicker
                      selected={this.state.date}
                      className='form-control'
                      onChange={this.onChangeDate}
                    />
                  </Space>
                </div>
              </div>

              <div className='form-group'>
                <button>Edit Exercise Log</button>
              </div>
            </form>
          </div>
        </Section>
      </>
    );
  }
}

const Section = styled.section`

  .form-control {
    margin-top: 0.5em;
    padding: '.5em 0';
    text-indent: '10px';
  }
  label {
    font-weight: 700;
  }
  select {
    border-radius: 0.35em;
    outline: none;
    background: white;
  }
  button {
    background: #40a9ff;
    outline: 0;
    border: 0;
    padding: 0.85em 1em;
    color: white;
    font-weight: 700;
  }

  .form-group + .form-group {
    margin-top: 1em;
  }
`;
