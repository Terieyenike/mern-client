import React, { useState } from 'react';
import styled from 'styled-components';
import style from '../../styles.module.css';
import { PageHeader, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

export const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
    };
    axios
      .post('https://lit-escarpment-62322.herokuapp.com/users/add', user)
      .then((res) => console.log(res.data));
    console.log(user);
    setUsername('');
  };
  return (
    <>
      <Section>
        <div className={style.container}>
          <PageHeader title='Create New User' className='page-header' />
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Username:</label>
              <div>
                <Input
                  required
                  value={username}
                  onChange={onChangeUsername}
                  suffix={<UserOutlined className='site-form-item-icon' />}
                />
              </div>
              <div className='form-group'>
                <button>Create User</button>
              </div>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

const Section = styled.section`
  padding: 1em 0;
  label {
    font-weight: 700;
  }
  button {
    background: #40a9ff;
    outline: 0;
    border: 0;
    padding: 0.85em 1em;
    color: white;
    font-weight: 700;
    margin-top: 1em;
  }
`;
