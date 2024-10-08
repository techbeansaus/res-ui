import React, { useEffect, useState } from 'react';
import './App.css';
import { validateForm } from './FormValidator';
import ReservationForm from './ReservationForm';
import logo from './logoTF.png';

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

  const [formErrors, setFormErrors] = useState({});
  
  const setFormError = (fieldName, error) => {
    // console.log(fieldName);
    // let obj = {...formErrors, [fieldName] : error};
    // console.log(obj);
    // setFormErrors(obj);
    // console.log(formErrors);
    //formErrors[fieldName]=error;
    
    setFormErrors({...formErrors,[fieldName]:error});
    //console.log(formErrors);
  };

  useEffect(()=>{
    console.log("Form Errors changed");
    console.log(formErrors);
  },[formErrors]);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [response, setResponse] = useState({});

const handleSubmit = async (event) => {
  event.preventDefault();

  let errors = validateForm(reservation);

  // building the request object which POST the form data to the Booking service
  const req={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservation)
  };
  
  // if no errors detected by validate
  if (Object.keys(errors).length === 0) {
    // submit form data to server
    try {
      console.log(req);
      const res = await fetch('http://localhost:6002/api/reservations',req);
    const jsonRes = await res.json;
    setResponse(JSON.stringify(jsonRes));
      await setReservation(reservation);
      setSubmitError(false);
      setSubmitSuccess(true);
      setReservation({});
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitError(true);
      setSubmitErrorMessage(error.message);
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    }

  } else { // if there are errors in validation, set error message for the respective field
    Object.keys(errors).forEach((fieldName) => {
      setFormError(fieldName, errors[fieldName]);
    });
  }
}

  const handleChange = (e) => {
    // as soon as we start to enter something in a field, we want to clear any existing error on that field
    setFormError(e.target.name,null);
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
        formErrors={formErrors}
      />
       <br></br>
    <footer className="App-footer">
      
    </footer>
    </div>
    
  );
}

export default App;
