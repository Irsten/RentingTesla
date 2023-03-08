﻿using Microsoft.AspNetCore.Mvc;
using RentingTesla.Entities;
using RentingTesla.Models;
using RentingTesla.Services;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace RentingTesla.Controllers
{
    [Route("api/rental")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly RentingTeslaDbContext _dbContext;
        private readonly IRentalService _rentalService;

        private readonly Regex emailRegex = new Regex(@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
        private readonly Regex phoneNumberRegex = new Regex(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$");
        

        public RentalController(RentingTeslaDbContext dbContext, IRentalService rentalService)
        {
            _dbContext = dbContext;
            _rentalService = rentalService;
        }

        [HttpPost("make-reservation")]
        public ActionResult MakeReservation([FromBody] RentalDetailsDto dto)
        {
            // check if the passed data are empty
            if (dto.BorrowerFirstName == "") { return BadRequest("Your first name cannot be empty."); }
            if (dto.BorrowerLastName == "") { return BadRequest("Your last name cannot be empty."); }
            if (dto.BorrowerEmail == "") { return BadRequest("Your email cannot be empty."); }
            if (dto.BorrowerPhoneNumber == "") { return BadRequest("Your phone number cannot be empty."); }
            if (dto.PickupLocation == "") { return BadRequest("The pickup location cannot be empty."); }
            if (dto.PickupDate == DateTime.MinValue) { return BadRequest("The pickup date cannot be empty."); }
            if (dto.ReturnLocation == "") { return BadRequest("The return location cannot be empty."); }
            if (dto.ReturnDate == DateTime.MinValue) { return BadRequest("The return date cannot be empty."); }
            if (dto.CarId == 0) { return BadRequest("The car id cannot be 0."); }

            // check email format and phone number format
            if (!emailRegex.IsMatch(dto.BorrowerEmail)) { return BadRequest("Your email does not match email format."); }
            if (!phoneNumberRegex.IsMatch(dto.BorrowerPhoneNumber)) { return BadRequest("Your phone number does not match phone number format."); }

            // check if the locations exists
            var locations = _dbContext.Locations.Select(l => l.LocationName).ToList();
            if (!locations.Contains(dto.PickupLocation)) { return BadRequest("The selected pickup location does not exist. Try to choose again."); }
            if (!locations.Contains(dto.ReturnLocation)) { return BadRequest("The selected return location does not exist. Try to choose again."); }

            // check if the dates are correct 
            var rentalPeriod = dto.ReturnDate.Day - dto.PickupDate.Day;
            if (dto.PickupDate < DateTime.Now) { return BadRequest("You have to pick future date."); }
            if (dto.ReturnDate < DateTime.Now) { return BadRequest("You have to pick future date."); }
            if (dto.ReturnDate < dto.PickupDate) { return BadRequest("The return date cannot be earlier than pickup date."); }
            if (rentalPeriod < 1) { return BadRequest("You have to rent a car for at least 1 day."); }

            // check if the selected car exists
            var car = _dbContext.Cars.FirstOrDefault(c => c.Id== dto.CarId);
            if (car == null) { return BadRequest("The selected car does not exist."); }

            // check if the selected car is available
            var returnDates = _dbContext.RentalsDetails.Where(r => r.CarId == dto.CarId).Select(r => r.ReturnDate).ToList();
            foreach (var date in returnDates)
            {
                if(dto.PickupDate < date) { return BadRequest("The selected car is not available now."); }
            }

            _rentalService.MakeReservation(dto);

            return Ok("Success!");
        }
    }
}
