import React, { Component } from 'react';
import TeslaHomePage from '../images/tesla-home-page.jpg';
import Cars from './Cars';

import './components.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <div className='container mb-3'>
          <div className='title-image'>
            <img src={TeslaHomePage} alt='Tesla' style={{ width: '120%' }} />
          </div>
          <div className='container title-container'>
            <h1 style={{ width: '30%' }}>RENT A TESLA IN MALLORCA</h1>
          </div>
        </div>
        <div className='container form-container'>
          <form className='form'>
            <div className='row'>
              <h3>Reservation data</h3>
              <div className='col'>
                <div className='form-floating mb-2'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Open this select menu</option>
                    <option value='1'>Palma Airport</option>
                    <option value='2'>Palma City Center</option>
                    <option value='3'>Alcudia</option>
                    <option value='3'>Manacor</option>
                  </select>
                  <label>Pickup location</label>
                </div>
                <div className='form-floating mb-2'>
                  <input className='form-control' type='date'></input>
                  <label>Pickup date</label>
                </div>
                <div className='form-floating mb-2'>
                  <input className='form-control' type='time'></input>
                  <label>Pickup time</label>
                </div>
              </div>
              <div className='col'>
                <div className='form-floating mb-2'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Open this select menu</option>
                    <option value='1'>Palma Airport</option>
                    <option value='2'>Palma City Center</option>
                    <option value='3'>Alcudia</option>
                    <option value='3'>Manacor</option>
                  </select>
                  <label>Return location</label>
                </div>
                <div className='form-floating mb-2'>
                  <input className='form-control' type='date'></input>
                  <label>Return date</label>
                </div>
                <div className='form-floating mb-2'>
                  <input className='form-control' type='time'></input>
                  <label>Return time</label>
                </div>
              </div>
              <Cars />
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
                      placeholder='Last name'
                    ></input>
                    <label>Last name</label>
                  </div>
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
              <button className='btn btn-primary form-control mb-2'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
