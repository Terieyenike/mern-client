import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import style from '../../styles.module.css';
import { PageHeader, Input, DatePicker, Space } from 'antd';
import axios from 'axios';

export const CreateExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await fetch(
        'https://lit-escarpment-62322.herokuapp.com/users/'
      );
      const data = await response.json();
      if (data.length > 0) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .post(
        'https://lit-escarpment-62322.herokuapp.com/exercises/add',
        exercise
      )
      .then((res) => console.log(res.data));
    window.location = '/';
    setDescription('');
    setDuration('');
    setDate('');
  };
  return (
    <>
      <Section>
        <div className={style.container}>
          <PageHeader title='Create New Exercise Log' />
          <form onSubmit={handleSubmit}>
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
                  value={username}
                  onChange={onChangeUsername}>
                  {users.map((user) => {
                    return (
                      <option key={user._id} value={user.username}>
                        {user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)}
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
                  value={
                    description.charAt(0).toUpperCase() + description.slice(1)
                  }
                  onChange={onChangeDescription}
                  className='form-control'
                />
              </div>
            </div>
            <div className='form-group'>
              <label>Duration (in minutes):</label>
              <div>
                <Input
                  value={duration}
                  onChange={onChangeDuration}
                  className='form-control'
                />
              </div>
            </div>
            <div className='form-group'>
              <label>Date:</label>
              <div>
                <Space direction='vertical' size={12}>
                  <DatePicker
                    selected={date}
                    className='form-control'
                    onChange={onChangeDate}
                  />
                </Space>
              </div>
            </div>

            <div className='form-group'>
              <button>Create Exercise Log</button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

const Section = styled.section`
  /* padding: 1em 0; */
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
