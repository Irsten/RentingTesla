using Microsoft.AspNetCore.Mvc;
using RentingTesla.Entities;
using RentingTesla.Services;

namespace RentingTesla.Controllers
{
    [Route("api/{locationId}/car")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet("get-all")]
        public ActionResult GetAllCarsInLocation([FromRoute] int locationId)
        {
            var cars = _carService.GetAll();

            return Ok(cars);
        }

        [HttpGet("{carId}")]
        public ActionResult GetCarById([FromRoute] int locationId, [FromRoute] int carId) 
        {
            var car = _carService.GetCar(carId);

            return Ok(car);
        }
    }
}
