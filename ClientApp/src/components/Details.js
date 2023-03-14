import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const url = 'https://localhost:7024/api/';

export default function Details() {
  const [pickupLocationName, setPickupLocationName] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnLocationName, setReturnLocationName] = useState('');
  const [returnDate, setReturnDate] = useState(new Date());
  const [carDetails, setCarDetails] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const location = useLocation();

  useEffect(() => {
    getPickupLocation();
    setPickupDate(new Date(location.state.pickupDate));
    getReturnLocation();
    setReturnDate(new Date(location.state.returnDate));
    getCar();
    calculateTotalCost();
  }, []);

  const getPickupLocation = async () => {
    axios
      .get(url + 'locations/' + location.state.pickupLocationId)
      .then((response) => {
        setPickupLocationName(response.data.locationName);
      })
      .catch((err) => console.log(err));
  };

  const getReturnLocation = async () => {
    axios
      .get(url + 'locations/' + location.state.returnLocationId)
      .then((response) => {
        setReturnLocationName(response.data.locationName);
      })
      .catch((err) => console.log(err));
  };

  const getCar = async () => {
    axios
      .get(
        url +
          'locations/' +
          location.state.pickupLocationId +
          '/cars/' +
          location.state.carId
      )
      .then((response) => {
        setCarDetails(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const calculateTotalCost = () => {
    // const diffTime = Math.abs(returnDate - pickupDate);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays);
    const diffTime = Math.abs(returnDate - pickupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalCost(diffDays * carDetails.pricePerDay);
  };

  const handleClick = () => {
    console.log(totalCost);
  };

  return (
    <div className='details container mt-5'>
      <div className='reservation-data-details'>
        <div className='pickup-location mb-2'>
          <h6>Pickup location</h6>
          {pickupLocationName}
        </div>
        <div className='pickup-date mb-2'>
          <h6>Pickup date</h6>
          {pickupDate.toLocaleDateString()} {pickupDate.toLocaleTimeString()}
        </div>
        <div className='return-location mb-2'>
          <h6>Return location</h6>
          {returnLocationName}
        </div>
        <div className='return-date mb-2'>
          <h6>Return date</h6>
          {returnDate.toLocaleDateString()} {returnDate.toLocaleTimeString()}
        </div>
      </div>
      <div className='car-details'>
        <div className='car mb-2'>
          <h6>Car</h6>
          {carDetails.model} {carDetails.pricePerDay} {carDetails.range}{' '}
          {carDetails.seats}
        </div>
        <div className='total-cost mb-2'>
          <h6>Total cost</h6>
          {totalCost}
        </div>
      </div>
      <div className='personal-data-details'>
        <div className='borrower-first-name mb-2'>
          <h6>First name</h6>Radomir
        </div>
        <div className='borrower-last-name mb-2'>
          <h6>Last name</h6>Pankiewicz
        </div>
        <div className='borrower-email mb-2'>
          <h6>Email</h6>radekp520@gmail.com
        </div>
        <div className='borrower-phone-number mb-2'>
          <h6>Phone number</h6>572232616
        </div>
      </div>
      {/* <button onClick={handleClick}>button</button> */}
    </div>
  );
}
