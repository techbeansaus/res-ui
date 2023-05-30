import React from 'react';
import logo from './logoTF.png';
import { Form, Col, Row, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import './ReservationForm.css';
import './App.css'

const ReservationForm = (props) => {
  return (

    <div className="">
   
    <Form onSubmit={props.handleSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="formFirstName">
            <Form.Control 
            type="text"
            name="firstName" 
            placeholder="First name" 
            onChange={props.handleChange}
            value={props.reservation.firstName || ""}
            isInvalid={!!props.formErrors.firstName} />
            <Form.Control.Feedback type="invalid">
            {props.formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          
        {/* {props.formErrors.firstName && <span className="error-message">{props.formErrors.firstName}</span>} */}
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formLastName">
            <Form.Control 
            type="text"
            name="lastName" 
            placeholder="Last name" 
            onChange={props.handleChange}
            value={props.reservation.lastName || ""}/>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.lastName && <span className="error-message">{props.formErrors.lastName}</span>}
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formPhone">
            
            <Form.Control 
            type="tel" 
            name="phoneNumber"
            placeholder="Phone number" 
            onChange={props.handleChange}
            value={props.reservation.phoneNumber || ""}/>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.phoneNumber && <span className="error-message">{props.formErrors.phoneNumber}</span>}
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formEmail">
            
            <Form.Control 
            type="text" 
            name="emailAddress"
            placeholder="Email" 
            onChange={props.handleChange}
            value={props.reservation.emailAddress || ""}/>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.emailAddress && <span className="error-message">{props.formErrors.emailAddress}</span>}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="formDate">
            <Form.Control 
            type="date" 
            name="date"
            placeholder="Choose date" 
             onChange={props.handleChange}
             value={props.reservation.date || ""}/>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.date && <span className="error-message">{props.formErrors.date}</span>}
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formTime">
            
            <Form.Control 
            type="time" 
            name="timeSlot"
            placeholder="Choose time" 
            onChange={props.handleChange}
            value={props.reservation.timeSlot || ""}/>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.timeSlot && <span className="error-message">{props.formErrors.timeSlot}</span>}
        </Col>
      </Row><Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="formPartySize">
            <Form.Control 
            type="number" 
            name="numberOfGuests"
            placeholder="Number of guests" 
            onChange={props.handleChange}
            value={props.reservation.numberOfGuests || ""}/>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.numberOfGuests && <span className="error-message">{props.formErrors.numberOfGuests}</span>}
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formSpecialRequests">
            <Form.Control 
            as="textarea" rows="3" 
            placeholder="Special request(optional)"
            name="specialRequest"
            onChange={props.handleChange}
            value={props.reservation.specialRequest || ""} />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        {props.formErrors.specialRequest && <span className="error-message">{props.formErrors.specialRequest}</span>}
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit Reservation
      </Button>
    </Form>
   
  </div>

   
  );
}

export default ReservationForm;