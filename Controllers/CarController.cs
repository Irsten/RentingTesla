using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentingTesla.Entities;
using RentingTesla.Services;

namespace RentingTesla.Controllers
{
    [Route("api/locations/{locationId}/cars")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly RentingTeslaDbContext _dbContext;
        private readonly ICarService _carService;
        public CarController(RentingTeslaDbContext dbContext, ICarService carService)
        {
            _dbContext = dbContext;
            _carService = carService;
        }

        [HttpGet("get-all")]
        public async Task<ActionResult> GetAllCarsInLocation([FromRoute] int locationId)
        {
            var locations = await _dbContext.Locations.FirstOrDefaultAsync(l => l.Id == locationId);
            if (locations == null) { return BadRequest("The selected location does not exists."); }
            var cars = await _carService.GetAll(locationId);

            return Ok(cars);
        }

        [HttpGet("{carId}")]
        public async Task<ActionResult> GetCarById([FromRoute] int locationId, [FromRoute] int carId) 
        {
            var locations = await _dbContext.Locations.FirstOrDefaultAsync(l => l.Id == locationId);
            if (locations == null) { return BadRequest("The selected location does not exists."); }
            var car = await _carService.GetCarById(carId);

            return Ok(car);
        }
    }
}
