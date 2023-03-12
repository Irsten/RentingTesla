using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla.Services
{
    public interface IRentalService
    {
        bool MakeReservation(RentalDetailsDto dto);
    }

    public class RentalService : IRentalService
    {
        private readonly RentingTeslaDbContext _dbContext;
        public RentalService(RentingTeslaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool MakeReservation(RentalDetailsDto dto)
        {
            var rentalPeriod = dto.ReturnDate.Day - dto.PickupDate.Day;
            var rentalCost = CalculateRentalCost(dto.CarId, rentalPeriod);
            var pickupLocation = _dbContext.Locations.FirstOrDefault(l => l.Id == dto.PickupLocationId).LocationName;
            var returnLocation = _dbContext.Locations.FirstOrDefault(l => l.Id == dto.ReturnLocationId).LocationName;

            _dbContext.RentalsDetails.Add(new RentalDetails
            {
                BorrowerFirstName = dto.BorrowerFirstName,
                BorrowerLastName = dto.BorrowerLastName,
                BorrowerEmail = dto.BorrowerEmail,
                BorrowerPhoneNumber = dto.BorrowerPhoneNumber,
                PickupLocation = pickupLocation,
                PickupDate = dto.PickupDate,
                ReturnLocation = returnLocation,
                ReturnDate = dto.ReturnDate,
                RentalCost = rentalCost,
                CarId = dto.CarId,
            });
            _dbContext.SaveChanges();

            return true;
        }

        private int CalculateRentalCost(int carId, int rentalPeriod)
        {
            var car = _dbContext.Cars.FirstOrDefault(c => c.Id == carId);
            var pricePerDay = car.PricePerDay;
            var rentalCost = pricePerDay * rentalPeriod;

            return rentalCost;
        }
    }
}
