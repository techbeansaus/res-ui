import logo from './logoTF.png';
import './App.css';
import React, { useEffect, useState } from 'react';
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


  const validateForm = () => {
  
    let errors = {};
  
    if (!reservation.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!reservation.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!reservation.emailAddress) {
      errors.emailAddress = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(reservation.emailAddress)) {
      errors.emailAddress = "Invalid email address";
    }
  
    if (!reservation.phoneNumber) {
      errors.phoneNumber = "Phone is required";
    } else if (!/^[0-9]+$/.test(reservation.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }
  
    if (!reservation.bookingDate) {
      errors.bookingDate = "Date is required";
    }
  
    if (!reservation.timeSlot) {
      errors.timeSlot = "Time is required";
    }
  
    if (!reservation.numberOfGuests) {
      errors.numberOfGuests = "Party size is required";
    } else if (!/^[0-9]+$/.test(reservation.numberOfGuests)) {
      errors.numberOfGuests = "Invalid party size";
    }
    return errors;
  };

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [response, setResponse] = useState({});

const handleSubmit = async (event) => {
  event.preventDefault();

  let errors = validateForm();

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
      const res = await fetch('https://ugu4m3y7f9.execute-api.ap-southeast-2.amazonaws.com/dev/reservations',req);
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
