using Microsoft.AspNetCore.Mvc;
using RentingTesla.Entities;
using RentingTesla.Services;

namespace RentingTesla.Controllers
{
    [Route("api/{locationId}/car")]
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
        public ActionResult GetAllCarsInLocation([FromRoute] int locationId)
        {
            var locations = _dbContext.Locations.Where(l => l.Id == locationId);
            if (!locations.Any()) { return BadRequest("The selected location does not exists."); }
            var cars = _carService.GetAll(locationId);

            return Ok(cars);
        }

        [HttpGet("{carId}")]
        public ActionResult GetCarById([FromRoute] int locationId, [FromRoute] int carId) 
        {
            var locations = _dbContext.Locations.Where(l => l.Id == locationId);
            if (!locations.Any()) { return BadRequest("The selected location does not exists."); }
            var car = _carService.GetCarById(carId);

            return Ok(car);
        }
    }
}
