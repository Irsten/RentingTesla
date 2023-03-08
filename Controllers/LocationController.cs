using Microsoft.AspNetCore.Mvc;
using RentingTesla.Entities;
using RentingTesla.Services;

namespace RentingTesla.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;
        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet("get-all")]
        public ActionResult GetAll()
        {
            var locations = _locationService.GetAll();
            return Ok(locations);
        }
        [HttpGet("{locationId}")]
        public ActionResult GetLocationById([FromRoute] int locationId)
        {
            var location = _locationService.GetById(locationId);
            return Ok(location);
        }
    }
}
