import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const url = 'https://localhost:7024/api/';

export default function Details() {
  const [pickupLocationName, setPickupLocationName] = useState('');
  const [returnLocationName, setReturnLocationName] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const location = useLocation();

  const pickupDate = new Date(location.state.pickupDate);
  const returnDate = new Date(location.state.returnDate);

  useEffect(() => {
    getPickupLocation();
    getReturnLocation();
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
    const diffTime = Math.abs(returnDate - pickupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalCost(diffDays * location.state.carPricePerDay);
  };

  const handleClick = () => {
    console.log(totalCost);
  };

  return (
    <div className='details container mt-5'>
      <h3 className='mb-4'>Reservation details</h3>
      <div className='reservation-data-details row'>
        <div className='col-sm-4'>
          <div className='pickup-location mb-2'>
            <h6>Pickup location</h6>
            {pickupLocationName}
          </div>
          <div className='pickup-date mb-2'>
            <h6>Pickup date</h6>
            {pickupDate.toLocaleDateString()} {pickupDate.toLocaleTimeString()}
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='return-location mb-2'>
            <h6>Return location</h6>
            {returnLocationName}
          </div>
          <div className='return-date mb-2'>
            <h6>Return date</h6>
            {returnDate.toLocaleDateString()} {returnDate.toLocaleTimeString()}
          </div>
        </div>
      </div>
      {/* TODO CAR */}
      <div className='car-details'>
        <div className='col'>
          <div className='car mb-2'>
            <h6>Car</h6>
            {carDetails.model} {carDetails.pricePerDay} {carDetails.range}
            {carDetails.seats}
          </div>
          <div className='total-cost mb-2'>
            <h6>Total cost</h6>
            {totalCost} €
          </div>
        </div>
      </div>
      <div className='personal-data-details'>
        <div className='row'>
          <div className='borrower-first-name col-sm-4 mb-2'>
            <h6>First name</h6>Radomir
          </div>
          <div className='borrower-last-name col-sm-4 mb-2'>
            <h6>Last name</h6>Pankiewicz
          </div>
        </div>
        <div className='row'>
          <div className='borrower-email col-sm-4 mb-2'>
            <h6>Email</h6>radekp520@gmail.com
          </div>
          <div className='borrower-phone-number col-sm-4 mb-2'>
            <h6>Phone number</h6>572232616
          </div>
        </div>
      </div>
      {/* <button onClick={handleClick}>button</button> */}
    </div>
  );
}
