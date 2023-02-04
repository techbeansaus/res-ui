import logo from './logoTF.png';
import './App.css';
import React, { useState } from 'react';
import ReservationForm from './ReservationForm';

function App() {
  const [reservation, setReservation] = useState({
    firstName:"",
    lastName:"",
    phoneNumber:"",
    emailAddress:"",
    date:"",
    timeSlot:"",
    numberOfGuests:"",
    specialRequest:""
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [response, setResponse] = useState({});

const handleSubmit = async (event) => {
  event.preventDefault();
  const req={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservation)
  };
  
  try {
    const res = await fetch('http://192.168.1.103:8080/api/v1/booking',req);
  const jsonRes = await res.json;
  setResponse(JSON.stringify(jsonRes));
    await setReservation(reservation);
    setSubmitError(false);
    setSubmitSuccess(true);
    setReservation({});
  } catch (error) {
    setSubmitSuccess(false);
    setSubmitError(true);
    setSubmitErrorMessage(error.message);
  }


}

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
 <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <br></br>

        {submitSuccess && (
        <div className="success-message">
          Your reservation has been submitted successfully!
        </div>
      )}
      {submitError && (
        <div className="error-message">
          {submitErrorMessage}
        </div>
      )}
      <ReservationForm 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        reservation={reservation} 
      />
       <br></br>
    <footer className="App-footer">
      
    </footer>
    </div>
    
  );
}

export default App;
