using AutoMapper;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla.Services
{
    public interface ICarService
    {
        List<CarDto> GetAll(int locationId);
        CarDto GetCarById(int carId);
    }

    public class CarService : ICarService
    {
        private readonly RentingTeslaDbContext _dbContext;
        private readonly IMapper _mapper;
        public CarService(RentingTeslaDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public List<CarDto> GetAll(int locationId)
        {
            var allCars = _dbContext.Cars.Where(c => c.LocationId == locationId).ToList();
            var availableCars = new List<Car>();

            //check if the car is available now
            foreach (var car in allCars)
            {
                var rentalDetails = _dbContext.RentalsDetails.FirstOrDefault(r => r.CarId == car.Id);
                if (rentalDetails == null) { availableCars.Add(car); }
                else if (rentalDetails != null)
                {
                    if (rentalDetails.ReturnDate < DateTime.Now) { availableCars.Add(car); }
                }
            }

            var result = _mapper.Map<List<CarDto>>(availableCars);

            return result;
        }

        public CarDto GetCarById(int carId)
        {
            var car = _dbContext.Cars.FirstOrDefault(c => c.Id == carId);
            if (car == null) { return null; }
            var result = _mapper.Map<CarDto>(car);

            return result;
        }
    }
}