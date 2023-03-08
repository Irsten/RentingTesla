using RentingTesla.Entities;

namespace RentingTesla.Services
{
    public interface ILocationService
    {
        List<Location> GetAll();
        Location GetById(int locationId);
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
            return locations;
        }

        public Location GetById(int locationId)
        {
            var location = _dbContext.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location == null) { return null; }

            return location;
        }
    }
}
