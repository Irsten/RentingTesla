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
            var cars = _dbContext.Cars.Where(c => c.LocationId == locationId).ToList();

            return cars;
        }

        public Car GetCarById(int carId)
        {
            var car = _dbContext.Cars.FirstOrDefault(c => c.Id == carId);
            if (car == null) { return null; }

            return car;
        }
    }
}
