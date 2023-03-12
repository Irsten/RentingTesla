using RentingTesla.Entities;

namespace RentingTesla.Services
{
    public interface ICarService
    {
        List<Car> GetAll(int locationId);
        Car GetCarById(int carId);
    }

    public class CarService : ICarService
    {
        private readonly RentingTeslaDbContext _dbContext;
        public CarService(RentingTeslaDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public List<Car> GetAll(int locationId)
        {
            var allCars = _dbContext.Cars.Where(c => c.LocationId == locationId).ToList();
            var availableCars = new List<Car>();

            foreach (var car in allCars)
            {
                var isCarReserved = _dbContext.RentalsDetails.Where(r => r.CarId == car.Id);
                if (!isCarReserved.Any()) { availableCars.Add(car); }
            }

            return availableCars;
        }

        public Car GetCarById(int carId)
        {
            var car = _dbContext.Cars.FirstOrDefault(c => c.Id == carId);
            if (car == null) { return null; }

            return car;
        }
    }
}
