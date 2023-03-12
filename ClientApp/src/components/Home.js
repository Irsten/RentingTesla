import React, { useEffect, useState } from 'react';
import TeslaHomePage from '../images/tesla-home-page.jpg';
import axios from 'axios';

import './components.css';

const url = 'https://localhost:7024/api/';

export default function Home() {
  // DATA
  const [pickupLocationId, setPickupLocationId] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnLocationId, setReturnLocationId] = useState('');
  const [returnDate, setReturnDate] = useState(new Date());
  const [carId, setCarId] = useState(0);
  const [borrowerFirstName, setBorrowerFirstName] = useState('');
  const [borrowerLastName, setBorrowerLastName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [borrowerPhoneNumber, setBorrowerPhoneNumber] = useState('');

  // ADDITIONAL DATA
  const [locations, setLocations] = useState([]);
  const [carsInLocation, setCarsInLocation] = useState([]);

  useEffect(() => {
    // GET LOCATIONS FROM DATABASE
    axios
      .get(url + 'locations/get-all')
      .then((response) => {
        setLocations(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // SEND REQUEST TO MAKE A RESERVATION
  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  // get cars available in specific location from database and set pickupLocationId
  const handlePickupLocationChange = async (value) => {
    if (value === '0') {
      setCarsInLocation([]);
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
        if (value !== 0) {
          setReturnLocationId(value);
        }
        break;
      case 'returnDate':
        setReturnDate(value);
        break;
      case 'carId':
        if (value === '0') {
          setCarId('');
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
                    className='form-select'
                    onChange={(e) => handleFormChange(e)}
                  >
                    <option value='0'>Select pickup location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  <label>Pickup location</label>
                </div>
                <div className='form-floating'>
                  <input
                    id='pickupDate'
                    className='form-control'
                    type='datetime-local'
                    onChange={(e) => handleFormChange(e)}
                  ></input>
                  <label>Pickup date</label>
                </div>
              </div>
              <div className='col mb-3'>
                <div className='form-floating mb-2'>
                  <select
                    id='returnLocationId'
                    className='form-select'
                    onChange={(e) => handleFormChange(e)}
                  >
                    <option value='0'>Select return location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  <label>Return location</label>
                </div>
                <div className='form-floating'>
                  <input
                    id='returnDate'
                    className='form-control'
                    type='datetime-local'
                    onChange={(e) => handleFormChange(e)}
                  ></input>
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
                  className='form-select'
                  onChange={(e) => handleFormChange(e)}
                >
                  <option value='0'>Select car</option>
                  {carsInLocation.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.model} | Seats: {car.seats} | Range: {car.range} km |
                      Price: {car.pricePerDay} €/Day
                    </option>
                  ))}
                </select>
                <label>Available Cars</label>
              </div>
            </div>
            {/* PERSONAL DATA */}
            <div className='personal-data mb-3'>
              <h3>Personal data</h3>
              <div className='row'>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      id='firstName'
                      className='form-control'
                      type='text'
                      placeholder='First name'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    <label>First name</label>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      id='lastName'
                      className='form-control'
                      type='text'
                      placeholder='Last name'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    <label>Last name</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      id='email'
                      className='form-control'
                      type='text'
                      placeholder='Email'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
                    <label>Email</label>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      id='phoneNumber'
                      className='form-control'
                      type='text'
                      placeholder='Phone number'
                      onChange={(e) => handleFormChange(e)}
                    ></input>
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
