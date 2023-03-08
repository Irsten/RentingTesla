using RentingTesla.Entities;

namespace RentingTesla
{
    public class RentingTeslaSeeder
    {
        private readonly RentingTeslaDbContext _dbContext;
        public RentingTeslaSeeder(RentingTeslaDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if(!_dbContext.Locations.Any())
                {
                    var locations = GetLocations();
                    _dbContext.Locations.AddRange(locations);
                    _dbContext.SaveChanges();
                }
                if(!_dbContext.Cars.Any())
                {
                    var cars = GetCars();
                    _dbContext.Cars.AddRange(cars);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<Location> GetLocations()
        {
            var locations = new List<Location>()
            {
                new Location()
                {
                    LocationName = "Palma Airport",
                    
                },
                new Location()
                {
                    LocationName = "Palma City Center",
                },
                new Location()
                {
                    LocationName = "Alcudia",
                },
                new Location()
                {
                    LocationName = "Manacor",
                },
            };
            return locations;
        }
        private IEnumerable<Car> GetCars()
        {
            var cars = new List<Car>()
            {
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 1,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 2,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 3,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model S",
                    Seats = 5,
                    Range = 600,
                    PricePerDay= 120,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model 3",
                    Seats = 5,
                    Range = 400,
                    PricePerDay= 100,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model X",
                    Seats = 7,
                    Range = 543,
                    PricePerDay= 250,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 4,
                },
                new Car()
                {
                    Model = "Model Y",
                    Seats = 5,
                    Range = 500,
                    PricePerDay= 150,
                    LocationId = 4,
                },
            };
            return cars;
        }
    }
}
