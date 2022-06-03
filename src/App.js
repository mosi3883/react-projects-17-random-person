import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data?.results[0];
    const newPerson = {
      name: `${person.name.first} ${person.name.last}`,
      phone: person.phone,
      email: person.email,
      age: person.dob.age,
      street: `${person.location.street.number} ${person.location.street.name}`,
      password: person.login.password,
      image: person.picture.large,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle('name');
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    const btn = e.target.closest('button');
    const label = btn.dataset.label;
    setTitle(label);
    setValue(person[label]);
  };

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img src={person?.image ?? defaultImage} alt='random user' className='user-img' />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button className='icon' data-label='name' onMouseEnter={handleValue}>
              <FaUser />
            </button>
            <button className='icon' data-label='email' onMouseEnter={handleValue}>
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseEnter={handleValue}>
              <FaCalendarTimes />
            </button>
            <button className='icon' data-label='street' onMouseEnter={handleValue}>
              <FaMap />
            </button>
            <button className='icon' data-label='phone' onMouseEnter={handleValue}>
              <FaPhone />
            </button>
            <button className='icon' data-label='password' onMouseEnter={handleValue}>
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
