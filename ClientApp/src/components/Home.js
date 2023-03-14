import React, { useEffect, useState } from 'react';
import TeslaHomePage from '../images/tesla-home-page.jpg';
import axios from 'axios';

import './components.css';

const url = 'https://localhost:7024/api/';
const emailRegex = new RegExp(/^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/);
const phoneNumberRegex = new RegExp(/^\(?\d{3}\)?-? *\d{3}-? *-?\d{3}/);
const workingHoursStart = 9;
const workingHoursEnd = 21;

export default function Home() {
  // data
  const [pickupLocationId, setPickupLocationId] = useState(0);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnLocationId, setReturnLocationId] = useState(0);
  const [returnDate, setReturnDate] = useState(new Date());
  const [carId, setCarId] = useState(0);
  const [borrowerFirstName, setBorrowerFirstName] = useState('');
  const [borrowerLastName, setBorrowerLastName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [borrowerPhoneNumber, setBorrowerPhoneNumber] = useState('');

  // additional data
  const [locations, setLocations] = useState([]);
  const [carsInLocation, setCarsInLocation] = useState([]);

  // errors
  const [pickupLocationIdError, setPickupLocationIdError] = useState('');
  const [pickupDateError, setPickupDateError] = useState('');
  const [returnLocationIdError, setReturnLocationIdError] = useState('');
  const [returnDateError, setReturnDateError] = useState('');
  const [carIdError, setCarIdError] = useState('');
  const [borrowerFirstNameError, setBorrowerFirstNameError] = useState('');
  const [borrowerLastNameError, setBorrowerLastNameError] = useState('');
  const [borrowerEmailError, setBorrowerEmailError] = useState('');
  const [borrowerPhoneNumberError, setBorrowerPhoneNumberError] = useState('');

  useEffect(() => {
    // get locations from database
    axios
      .get(url + 'locations/get-all')
      .then((response) => {
        setLocations(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get todays date
  const getMinDate = () => {
    var minDate = new Date();
    var dd = minDate.getDate();
    var MM = minDate.getMonth() + 1;
    var yyyy = minDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (MM < 10) {
      MM = '0' + MM;
    }
    minDate = yyyy + '-' + MM + '-' + dd + 'T00:00';

    return minDate;
  };

  // get cars available in selected location and set pickupLocationId
  const handlePickupLocationChange = async (value) => {
    setCarId(0);
    if (value === '0') {
      setCarsInLocation([]);
      setPickupLocationId(0);
    } else {
      setPickupLocationId(value);
      await axios
        .get(url + 'locations/' + value + '/cars/get-all')
        .then((response) => {
          setCarsInLocation(response.data);
        })
        .catch((err) => console.log(err));
    }
  };

  // set data value based on input id
  const handleFormChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case 'pickupLocationId':
        handlePickupLocationChange(value);
        break;
      case 'pickupDate':
        setPickupDate(value);
        break;
      case 'returnLocationId':
        if (value === '0') {
          setReturnLocationId(0);
        } else {
          setReturnLocationId(value);
        }
        break;
      case 'returnDate':
        setReturnDate(value);
        break;
      case 'carId':
        if (value === '0') {
          setCarId(0);
        } else {
          setCarId(value);
        }
        break;
      case 'firstName':
        setBorrowerFirstName(value);
        break;
      case 'lastName':
        setBorrowerLastName(value);
        break;
      case 'email':
        setBorrowerEmail(value);
        break;
      case 'phoneNumber':
        setBorrowerPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  // validation functions
  const formValidation = () => {
    var errors = 0;

    // pickupLocationId validation
    if (pickupLocationId === 0) {
      setPickupLocationIdError('You must choose a pickup location.');
      errors += 1;
    } else {
      setPickupLocationIdError('');
    }
    // pickupDate valiation
    var currentDate = new Date();
    var pDate = new Date(pickupDate);
    if (pickupDate === '') {
      setPickupDateError('You must choose a pickup date.');
      errors += 1;
    } else if (pDate < currentDate) {
      setPickupDateError('You must choose a future date.');
      errors += 1;
    } else if (
      pDate.getHours() < workingHoursStart ||
      pDate.getHours() > workingHoursEnd
    ) {
      setPickupDateError('Our office hours are 9:00-21:00.');
      errors += 1;
    } else {
      setPickupDateError('');
    }
    // returnLocationId validation
    if (returnLocationId === 0) {
      setReturnLocationIdError('You must choose a return location.');
      errors += 1;
    } else {
      setReturnLocationIdError('');
    }
    // returnDate validation
    var rDate = new Date(returnDate);
    if (returnDate === '') {
      setReturnDateError('You must choose a return date.');
      errors += 1;
    } else if (rDate < currentDate) {
      setReturnDateError('You must choose a future date.');
      errors += 1;
    } else if (returnDate < pickupDate) {
      setReturnDateError('Return date cannot be earlier than pickup date.');
      errors += 1;
    } else if (returnDate === pickupDate) {
      setReturnDateError('Return date and pickup date must not be the same.');
      errors += 1;
    } else if (
      rDate.getHours() < workingHoursStart ||
      rDate.getHours() > workingHoursEnd
    ) {
      setReturnDateError('Our office hours are 9:00-21:00.');
      errors += 1;
    } else {
      setReturnDateError('');
    }
    // carId validation
    if (carId === 0) {
      setCarIdError('You must choose a car.');
      errors += 1;
    } else {
      setCarIdError('');
    }
    // borrowerFirstName validation
    if (borrowerFirstName.trim().length === 0) {
      setBorrowerFirstNameError('First name cannot be empty.');
      errors += 1;
    } else if (borrowerFirstName.trim().length < 3) {
      setBorrowerFirstNameError(
        'First name is too short. It must have at least 3 characters.'
      );
      errors += 1;
    } else if (borrowerFirstName.trim().length > 100) {
      setBorrowerFirstNameError(
        'First name is too long. It can have a maximum of 100 characters.'
      );
      errors += 1;
    } else {
      setBorrowerFirstNameError('');
    }
    // borrowerLastName validation
    if (borrowerLastName.trim().length === 0) {
      setBorrowerLastNameError('Last name cannot be empty.');
      errors += 1;
    } else if (borrowerLastName.trim().length < 3) {
      setBorrowerLastNameError(
        'Last name is too short. It must have at least 3 characters.'
      );
      errors += 1;
    } else if (borrowerLastName.trim().length > 100) {
      setBorrowerLastNameError(
        'Last name is too long. It can have a maximum of 100 characters.'
      );
      errors += 1;
    } else {
      setBorrowerLastNameError('');
    }
    // borrowerEmail validation
    if (borrowerEmail.trim().length === 0) {
      setBorrowerEmailError('Email cannot be empty.');
      errors += 1;
    } else if (!emailRegex.test(borrowerEmail)) {
      setBorrowerEmailError(
        'Incorrect email format. The correct format is example@example.com.'
      );
      errors += 1;
    } else {
      setBorrowerEmailError('');
    }
    // borrowerPhoneNumber validation
    if (borrowerPhoneNumber.trim().length === 0) {
      setBorrowerPhoneNumberError('Phone number cannot be empty.');
      errors += 1;
    } else if (!phoneNumberRegex.test(borrowerPhoneNumber)) {
      setBorrowerPhoneNumberError(
        'Incorrect phone format. The correct formats are: 123123123/123-123-123.'
      );
      errors += 1;
    } else {
      setBorrowerPhoneNumberError('');
    }
    if (errors === 0) {
      //handleSubmit();
      return true;
    } else {
      return false;
    }
  };

  // send request to make a reservation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      await axios
        .post(url + 'reservations/make-reservation', {
          borrowerFirstName,
          borrowerLastName,
          borrowerEmail,
          borrowerPhoneNumber,
          pickupLocationId,
          pickupDate,
          returnLocationId,
          returnDate,
          carId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    } else {
      console.log('general kenobi');
    }
  };

  return (
    <div>
      <div className='container mb-3'>
        <div className='title-image'>
          <img src={TeslaHomePage} alt='Tesla' style={{ width: '127%' }} />
        </div>
        <div className='container title-container'>
          <h1 style={{ width: '30%' }}>RENT A TESLA IN MALLORCA</h1>
        </div>
      </div>
      <div className='container form-container'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='container'>
            {/* RESERVATION DATA */}
            <div className='reservation-data row'>
              <h3>Reservation data</h3>
              <div className='col'>
                <div className='form-floating mb-2'>
                  <select
                    id='pickupLocationId'
                    className={
                      pickupLocationIdError === ''
                        ? 'form-select'
                        : 'form-select is-invalid'
                    }
                    onChange={(e) => handleFormChange(e)}
                  >
                    <option value={0}>Select pickup location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  {pickupLocationIdError && (
                    <div className='invalid-feedback'>
                      {pickupLocationIdError}
                    </div>
                  )}
                  <label>Pickup location</label>
                </div>
                <div className='form-floating'>
                  <input
                    id='pickupDate'
                    className={
                      pickupDateError !== ''
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    min={getMinDate()}
                    type='datetime-local'
                    onChange={(e) => handleFormChange(e)}
                  ></input>
                  {pickupDateError && (
                    <div className='invalid-feedback'>{pickupDateError}</div>
                  )}
                  <label>Pickup date</label>
                </div>
              </div>
              <div className='col mb-3'>
                <div className='form-floating mb-2'>
                  <select
                    id='returnLocationId'
                    className={
                      returnLocationIdError !== ''
                        ? 'form-select is-invalid'
                        : 'form-select'
                    }
                    onChange={(e) => handleFormChange(e)}
                  >
                    <option value={0}>Select return location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  {returnLocationIdError && (
                    <div className='invalid-feedback'>
                      {returnLocationIdError}
                    </div>
                  )}
                  <label>Return location</label>
                </div>
                <div className='form-floating'>
                  <input
                    id='returnDate'
                    className={
                      returnDateError !== ''
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    min={getMinDate()}
                    type='datetime-local'
                    onChange={(e) => handleFormChange(e)}
                  ></input>
                  {returnDateError && (
                    <div className='invalid-feedback'>{returnDateError}</div>
                  )}
                  <label>Return date</label>
                </div>
              </div>
            </div>
            {/* CARS */}
            <div className='cars mb-3'>
              <h3>Cars</h3>
              <div className='form-floating mb-2'>
                <select
                  id='carId'
                  className={
                    carIdError !== '' ? 'form-select is-invalid' : 'form-select'
                  }
                  onChange={(e) => handleFormChange(e)}
                >
                  <option value={0}>Select car</option>
                  {carsInLocation.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.model} | Seats: {car.seats} | Range: {car.range} km |
                      Price: {car.pricePerDay} €/Day
                    </option>
                  ))}
                </select>
                {carIdError && (
                  <div className='invalid-feedback'>{carIdError}</div>
                )}
                <label>Available Cars</label>
              </div>
            </div>
            {/* PERSONAL DATA */}
            <div className='personal-data mb-3'>
              <h3>Personal data</h3>
              <div className='row'>
                <div className='col-md-6 col-lg-6'>
                  <div className='form-floating mb-2'>
                    <input
                      id='firstName'
                      className={
                        borrowerFirstNameError !== ''
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type='text'
                      placeholder='First name'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    {borrowerFirstNameError && (
                      <div className='invalid-feedback'>
                        {borrowerFirstNameError}
                      </div>
                    )}
                    <label>First name</label>
                  </div>
                </div>
                <div className='col-md-6 col-lg-6'>
                  <div className='form-floating mb-2'>
                    <input
                      id='lastName'
                      className={
                        borrowerLastNameError !== ''
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type='text'
                      placeholder='Last name'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    {borrowerLastNameError && (
                      <div className='invalid-feedback'>
                        {borrowerLastNameError}
                      </div>
                    )}
                    <label>Last name</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 col-lg-6'>
                  <div className='form-floating mb-2'>
                    <input
                      id='email'
                      className={
                        borrowerEmailError !== ''
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type='text'
                      placeholder='Email'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    {borrowerEmailError && (
                      <div className='invalid-feedback'>
                        {borrowerEmailError}
                      </div>
                    )}
                    <label>Email</label>
                  </div>
                </div>
                <div className='col-md-6 col-lg-6'>
                  <div className='form-floating mb-2'>
                    <input
                      id='phoneNumber'
                      className={
                        borrowerPhoneNumberError !== ''
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type='text'
                      placeholder='Phone number'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    {borrowerPhoneNumberError && (
                      <div className='invalid-feedback'>
                        {borrowerPhoneNumberError}
                      </div>
                    )}
                    <label>Phone number</label>
                  </div>
                </div>
              </div>
            </div>
            <button className='btn btn-primary form-control mb-5' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
