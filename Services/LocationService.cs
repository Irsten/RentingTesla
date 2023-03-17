using AutoMapper;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla.Services
{
    public interface ILocationService
    {
        List<LocationDto> GetAll();
        LocationDto GetLocationById(int locationId);
    }

    public class LocationService : ILocationService
    {
        private readonly RentingTeslaDbContext _dbContext;
        private readonly IMapper _mapper;
        public LocationService(RentingTeslaDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public List<LocationDto> GetAll()
        {
            var locations = _dbContext.Locations.ToList();
            if (!locations.Any()) { return null; }
            var result = _mapper.Map<List<LocationDto>>(locations);

            return result;
        }

        public LocationDto GetLocationById(int locationId)
        {
            var location = _dbContext.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location == null) { return null; }
            var result = _mapper.Map<LocationDto>(location);

            return result;
        }
    }
}