using Microsoft.AspNetCore.Mvc;
using RentingTesla.Entities;
using RentingTesla.Services;

namespace RentingTesla.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;
        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet("get-all")]
        public async Task<ActionResult> GetAll()
        {
            var locations = await _locationService.GetAll();
            if (locations == null) { return BadRequest("There are no locations."); }

            return Ok(locations);
        }
        [HttpGet("{locationId}")]
        public async Task<ActionResult> GetLocationById([FromRoute] int locationId)
        {
            var location = await _locationService.GetLocationById(locationId);
            if (location == null) { return BadRequest("Selected location does not exist."); }

            return Ok(location);
        }
    }
}
