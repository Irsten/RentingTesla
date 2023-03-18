using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla.Services
{
    public interface IRentalService
    {
        ReservationDetailsGetDto GetReservation(int reservationId);
        int MakeReservation(ReservationDetailsPostDto dto);
    }

    public class ReservationService : IRentalService
    {
        private readonly RentingTeslaDbContext _dbContext;
        private readonly IMapper _mapper;
        public ReservationService(RentingTeslaDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public ReservationDetailsGetDto GetReservation(int reservationId)
        {
            var reservation = _dbContext.ReservationsDetails.Include(c => c.Car).FirstOrDefault(r => r.Id == reservationId);
            if (reservation == null) { return null; }
            var result = _mapper.Map<ReservationDetailsGetDto>(reservation);

            return result;
        }

        public int MakeReservation(ReservationDetailsPostDto dto)
        {
            var rentalPeriod = dto.ReturnDate.Day - dto.PickupDate.Day;
            var rentalCost = CalculateRentalCost(dto.CarId, rentalPeriod);
            var pickupLocation = _dbContext.Locations.FirstOrDefault(l => l.Id == dto.PickupLocationId).LocationName;
            var returnLocation = _dbContext.Locations.FirstOrDefault(l => l.Id == dto.ReturnLocationId).LocationName;

            var reservation = new ReservationDetails
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
            };

            _dbContext.ReservationsDetails.Add(reservation);
            var car = _dbContext.Cars.FirstOrDefault(c => c.Id == dto.CarId);
            car.LocationId = dto.ReturnLocationId;
            _dbContext.SaveChanges();
            var id = reservation.Id;

            return id;
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