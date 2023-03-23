using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla.Services
{
    public interface IReservationService
    {
        Task<ReservationDetailsGetDto> GetReservation(int reservationId);
        Task<int> MakeReservation(ReservationDetailsPostDto dto);
    }

    public class ReservationService : IReservationService
    {
        private readonly RentingTeslaDbContext _dbContext;
        private readonly IMapper _mapper;
        public ReservationService(RentingTeslaDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ReservationDetailsGetDto> GetReservation(int reservationId)
        {
            var reservation = await _dbContext.ReservationsDetails.Include(c => c.Car).FirstOrDefaultAsync(r => r.Id == reservationId);
            if (reservation == null) { return null; }
            var result = _mapper.Map<ReservationDetailsGetDto>(reservation);

            return result;
        }

        public async Task<int> MakeReservation(ReservationDetailsPostDto dto)
        {
            var rentalPeriod = dto.ReturnDate.Day - dto.PickupDate.Day;
            var pickupLocation = await _dbContext.Locations.FirstOrDefaultAsync(l => l.Id == dto.PickupLocationId);
            var pickupLocationName = pickupLocation.LocationName;
            var returnLocation = await _dbContext.Locations.FirstOrDefaultAsync(l => l.Id == dto.ReturnLocationId);
            var returnLocationName = returnLocation.LocationName;
            var car = await _dbContext.Cars.FirstOrDefaultAsync(c => c.Id == dto.CarId);

            var reservation = new ReservationDetails
            {
                BorrowerFirstName = dto.BorrowerFirstName,
                BorrowerLastName = dto.BorrowerLastName,
                BorrowerEmail = dto.BorrowerEmail,
                BorrowerPhoneNumber = dto.BorrowerPhoneNumber,
                PickupLocation = pickupLocationName,
                PickupDate = dto.PickupDate,
                ReturnLocation = returnLocationName,
                ReturnDate = dto.ReturnDate,
                RentalCost = car.PricePerDay * rentalPeriod,
                CarId = dto.CarId,
            };

            await _dbContext.ReservationsDetails.AddAsync(reservation);
            car.LocationId = dto.ReturnLocationId;
            await _dbContext.SaveChangesAsync();
            var id = reservation.Id;

            return id;
        }
    }
}