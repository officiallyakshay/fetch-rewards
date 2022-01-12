import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [occandstate, setOccandstate] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('Choose Occupation');
  const [state, setState] = useState('Choose State');

  useEffect(() => {
    fetch('https://frontend-take-home.fetchrewards.com/form')
      .then(response => response.json())
      .then(data => setOccandstate(data));
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (occupation === 'Choose Occupation' || state === 'Choose State') {
      alert('Choose a proper occupation and / or state');
    } else {
      const formInfo = { name, email, password, occupation, state };
      console.log(formInfo)
      fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(formInfo)
      }).then(() => {
        alert('Your form has been submitted!')
      });
      setName('');
      setEmail('');
      setPassword('');
      e.target.reset();
    }
  }
  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
      <h2>Create your User!</h2>
        <div className="user-box">
          <input 
            required
            value={name}
            type="text" 
            name="name" 
            onChange={(e) => setName(e.target.value)}
          />
          <label>Full Name</label>
        </div>
        <div className="user-box">
          <input 
            required
            value={email}
            type="text" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input 
            required
            value={password}
            type="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className="select">
          <select 
            required
            defaultValue={occupation}
            onChange={(e) => {
              const selectedOccupation = e.target.value;
              setOccupation(selectedOccupation);
            }}
          >
          <option>Select Occupation</option>
            {
              occandstate.occupations ? occandstate.occupations.map((oc, key) => 
                <option key={key} value={oc}>{oc}</option>
              ) : null
            }
          </select>
        </div>
        <div className="select">
          <select 
            required
            defaultValue={state}
            onChange={(e) => {
              const selectedState = e.target.value;
              setState(selectedState);
            }}
          >
          <option>Select State</option>
            {
              occandstate.states ? occandstate.states.map((st, key) => 
                <option key={key} value={st.name}>{st.abbreviation}</option>
              ) : null
            }
          </select>
        </div>
        <div className="user-box">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', color: 'white', fontSize: '9px' }}>Made with 🤍&nbsp;by Akshay</div>
    </div>
  );
};

export default App;
