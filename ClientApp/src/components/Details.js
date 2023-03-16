import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ModelS from '../images/tesla-model-s.jpg';
import ModelX from '../images/tesla-model-x.jpg';
import ModelY from '../images/tesla-model-y.png';
import Model3 from '../images/tesla-model-3.png';
import { useReactToPrint } from 'react-to-print';

const url = 'https://localhost:7024/api/';

export default function Details() {
  const [pickupLocationName, setPickupLocationName] = useState('');
  const [returnLocationName, setReturnLocationName] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const location = useLocation();
  const componentRef = useRef();

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
    console.log(diffDays);
    setTotalCost(diffDays * location.state.carPricePerDay);
  };

  const handleCarModel = () => {
    switch (carDetails.model) {
      case 'Model S':
        return (
          <img src={ModelS} alt='Tesla Model S' style={{ width: '100%' }} />
        );
      case 'Model X':
        return (
          <img src={ModelX} alt='Tesla Model X' style={{ width: '100%' }} />
        );
      case 'Model Y':
        return (
          <img src={ModelY} alt='Tesla Model Y' style={{ width: '100%' }} />
        );
      case 'Model 3':
        return (
          <img src={Model3} alt='Tesla Model 3' style={{ width: '100%' }} />
        );

      default:
        break;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'reservation-details',
  });

  return (
    <div className='container'>
      <div ref={componentRef} className='details container mt-4'>
        <h3 className='mb-4'>Reservation details</h3>
        <div className='reservation-data-details row' style={{ maxWidth: 700 }}>
          <div className='col'>
            <div className='pickup-location mb-2'>
              <h6>Pickup location</h6>
              {pickupLocationName}
            </div>
            <div className='pickup-date mb-2'>
              <h6>Pickup date</h6>
              {pickupDate.toLocaleDateString()}{' '}
              {pickupDate.toLocaleTimeString()}
            </div>
          </div>
          <div className='col'>
            <div className='return-location mb-2'>
              <h6>Return location</h6>
              {returnLocationName}
            </div>
            <div className='return-date mb-2'>
              <h6>Return date</h6>
              {returnDate.toLocaleDateString()}{' '}
              {returnDate.toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className='car-details row mt-2' style={{ maxWidth: 700 }}>
          <div className='col'>
            <div className='car mb-2'>
              <div className='car-model'>
                <h3>{carDetails.model}</h3>
              </div>
              <div className='car-image'>{handleCarModel()}</div>
              <div className='car-info row'>
                <div className='car-seats col p-2'>
                  <i className='bi bi-people-fill'></i>
                  <p>{carDetails.seats}</p>
                </div>
                <div className='car-range col p-2'>
                  <i className='bi bi-battery-full'></i>
                  <p>{carDetails.range} KM</p>
                </div>
                <div className='car-price-per-day col p-2'>
                  <i className='bi bi-currency-euro'></i>
                  <p>{carDetails.pricePerDay} €/Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='personal-data-details row' style={{ maxWidth: 700 }}>
          <div className='row'>
            <div className='borrower-first-name col mb-2'>
              <h6>First name</h6>Radomir
            </div>
            <div className='borrower-last-name col mb-2'>
              <h6>Last name</h6>Pankiewicz
            </div>
          </div>
          <div className='row'>
            <div className='borrower-email col mb-2'>
              <h6>Email</h6>radekp520@gmail.com
            </div>
            <div className='borrower-phone-number col mb-2'>
              <h6>Phone number</h6>572232616
            </div>
          </div>
        </div>
        <div className='total-cost mb-2'>
          <p className='fs-3'>Total cost: {totalCost} €</p>
        </div>
      </div>
      <div className='print-btn w-50'>
        <button className='btn btn-primary w-25' onClick={handlePrint}>
          <i className='bi bi-printer-fill'></i>
        </button>
      </div>
    </div>
  );
}
