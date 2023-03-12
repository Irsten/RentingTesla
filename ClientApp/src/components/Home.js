import React, { useEffect, useState } from 'react';
import TeslaHomePage from '../images/tesla-home-page.jpg';
import axios from 'axios';

import './components.css';

export default function Home() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [borrowerFirstName, setBorrowerFirstName] = useState('');
  const [borrowerLastName, setBorrowerLastName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [borrowerPhoneNumber, setBorrowerPhoneNumber] = useState('');
  const [rentalCost, setRentalCost] = useState('');

  const [locations, setLocations] = useState([]);
  const [carsInLocation, setCarsInLocation] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('https://localhost:7024/api/location/get-all')
        .then((response) => {
          setLocations(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handlePickupLocationChange = async (e) => {
    if (e.target.value !== '0') {
      setPickupLocation(e.target.value);
      try {
        await axios
          .get('https://localhost:7024/api/' + e.target.value + '/car/get-all')
          .then((response) => {
            setCarsInLocation(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCarSelection = (car) => {};

  const calculateRentalCost = () => {};

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
            <div className='reservation-data row'>
              <h3>Reservation data</h3>
              <div className='col'>
                <div className='form-floating mb-2'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    onChange={(e) => handlePickupLocationChange(e)}
                  >
                    <option defaultValue='0'>Select pickup location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  <label>Pickup location</label>
                </div>
                <div className='form-floating'>
                  <input className='form-control' type='datetime-local'></input>
                  <label>Pickup date</label>
                </div>
              </div>
              <div className='col mb-3'>
                <div className='form-floating mb-2'>
                  <select className='form-select'>
                    <option defaultValue='0'>Select return location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  <label>Return location</label>
                </div>
                <div className='form-floating'>
                  <input className='form-control' type='datetime-local'></input>
                  <label>Return date</label>
                </div>
              </div>
            </div>

            {/* CARS */}

            <div className='cars mb-3'>
              <h3>Cars</h3>
              <div className='form-floating mb-2'>
                <select className='form-select'>
                  <option value='0' selected disabled>
                    Select car
                  </option>
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

            <div className='personal-data mb-3'>
              <h3>Personal data</h3>
              <div className='row'>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='First name'
                    ></input>
                    <label>First name</label>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Last name'
                    ></input>
                    <label>Last name</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='First name'
                    ></input>
                    <label>Email</label>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-floating mb-2'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='First name'
                    ></input>
                    <label>Phone number</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='total-cost mb-3'>
              <h3>Total cost: {rentalCost}</h3>
            </div>
            <button className='btn btn-primary form-control mb-5'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
