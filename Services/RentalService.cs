using Microsoft.AspNetCore.Mvc;
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
            _dbContext.RentalsDetails.Add(new RentalDetails
            {
                BorrowerFirstName = dto.BorrowerFirstName,
                BorrowerLastName = dto.BorrowerLastName,
                BorrowerEmail = dto.BorrowerEmail,
                BorrowerPhoneNumber = dto.BorrowerPhoneNumber,
                PickupLocation = dto.PickupLocation,
                PickupDate = dto.PickupDate,
                ReturnLocation = dto.ReturnLocation,
                ReturnDate = dto.ReturnDate,
                RentalCost = dto.RentalCost,
                CarId = dto.CarId,
            });
            _dbContext.SaveChanges();

            return true;
        }
    }
}
