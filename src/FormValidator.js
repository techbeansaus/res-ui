export const validateForm = (reservation) => {
  
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