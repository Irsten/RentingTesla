using RentingTesla.Entities;

namespace RentingTesla.Services
{
    public interface ILocationService
    {
        List<Location> GetAll();
        Location GetLocationById(int locationId);
    }

    public class LocationService : ILocationService
    {
        private readonly RentingTeslaDbContext _dbContext;
        public LocationService(RentingTeslaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Location> GetAll()
        {
            var locations = _dbContext.Locations.ToList();
            if (!locations.Any()) { return null; }

            return locations;
        }

        public Location GetLocationById(int locationId)
        {
            var location = _dbContext.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location == null) { return null; }

            return location;
        }
    }
}
