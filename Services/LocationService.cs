using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla.Services
{
    public interface ILocationService
    {
        Task<List<LocationDto>> GetAll();
        Task<LocationDto> GetLocationById(int locationId);
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

        public async Task<List<LocationDto>> GetAll()
        {
            var locations = await _dbContext.Locations.ToListAsync();
            if (!locations.Any()) { return null; }
            var result = _mapper.Map<List<LocationDto>>(locations);

            return result;
        }

        public async Task<LocationDto> GetLocationById(int locationId)
        {
            var location = await _dbContext.Locations.FirstOrDefaultAsync(l => l.Id == locationId);
            if (location == null) { return null; }
            var result = _mapper.Map<LocationDto>(location);

            return result;
        }
    }
}