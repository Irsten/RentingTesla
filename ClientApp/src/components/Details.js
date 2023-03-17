import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import ModelS from '../images/tesla-model-s.jpg';
import ModelX from '../images/tesla-model-x.jpg';
import ModelY from '../images/tesla-model-y.png';
import Model3 from '../images/tesla-model-3.png';

const url = 'https://localhost:7024/api/';

export default function Details() {
  // data
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnLocation, setReturnLocation] = useState('');
  const [returnDate, setReturnDate] = useState(new Date());
  const [car, setCar] = useState({
    model: '',
    seats: '',
    range: '',
    pricePerDay: '',
  });
  const [borrowerFirstName, setBorrowerFirstName] = useState('');
  const [borrowerLastName, setBorrowerLastName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [borrowerPhoneNumber, setBorrowerPhoneNumber] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const location = useLocation();
  const componentRef = useRef();

  useEffect(() => {
    getReservationDetails();
  }, []);

  // get reservation details
  const getReservationDetails = async () => {
    await axios
      .get(url + 'reservations/' + location.state.reservationId)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

  // set data values
  const setData = (data) => {
    setPickupLocation(data.pickupLocation);
    setPickupDate(new Date(data.pickupDate));
    setReturnLocation(data.returnLocation);
    setReturnDate(new Date(data.returnDate));
    setCar(data.car);
    setBorrowerFirstName(data.borrowerFirstName);
    setBorrowerLastName(data.borrowerLastName);
    setBorrowerEmail(data.borrowerEmail);
    setBorrowerPhoneNumber(data.borrowerPhoneNumber);
    setTotalCost(data.rentalCost);
  };

  // display car image based on car model
  const handleCarModel = () => {
    switch (car.model) {
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

  // print details to pdf
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'reservation-details',
  });

  return (
    <>
      {location.state.reservationId > 0 ? (
        <div className='container'>
          <div ref={componentRef} className='details container mt-4'>
            <h3 className='mb-4'>Reservation details</h3>
            <div
              className='reservation-data-details row'
              style={{ maxWidth: 700 }}
            >
              <div className='col'>
                <div className='pickup-location mb-2'>
                  <h6>Pickup location</h6>
                  {pickupLocation}
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
                  {returnLocation}
                </div>
                <div className='return-date mb-2'>
                  <h6>Return date</h6>
                  {returnDate.toLocaleDateString()}{' '}
                  {returnDate.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className='car-details row mt-2' style={{ maxWidth: 700 }}>
              <div className='car mb-2'>
                <div className='car-model'>
                  <h3>{car.model}</h3>
                </div>
                <div className='car-image'>{handleCarModel()}</div>
                <div className='car-info row'>
                  <div className='car-seats col p-2'>
                    <i className='bi bi-people-fill'></i>
                    <p>{car.seats}</p>
                  </div>
                  <div className='car-range col p-2'>
                    <i className='bi bi-battery-full'></i>
                    <p>{car.range} KM</p>
                  </div>
                  <div className='car-price-per-day col p-2'>
                    <i className='bi bi-currency-euro'></i>
                    <p>{car.pricePerDay} €/Day</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='personal-data-details row'
              style={{ maxWidth: 700 }}
            >
              <div className='row'>
                <div className='borrower-first-name col mb-2'>
                  <h6>First name</h6>
                  {borrowerFirstName}
                </div>
                <div className='borrower-last-name col mb-2'>
                  <h6>Last name</h6>
                  {borrowerLastName}
                </div>
              </div>
              <div className='row'>
                <div className='borrower-email col mb-2'>
                  <h6>Email</h6>
                  {borrowerEmail}
                </div>
                <div className='borrower-phone-number col mb-2'>
                  <h6>Phone number</h6>
                  {borrowerPhoneNumber}
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
      ) : (
        <div></div>
      )}
    </>
  );
}
