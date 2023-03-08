using Microsoft.AspNetCore.Mvc;
using RentingTesla.Entities;
using RentingTesla.Models;
using RentingTesla.Services;

namespace RentingTesla.Controllers
{
    [Route("api/rental")]
    [ApiController]
    public class RentalController : ControllerBase
    {

        private readonly IRentalService _rentalService;
        public RentalController(IRentalService rentalService)
        {
            _rentalService = rentalService;
        }

        [HttpPost("make-reservation")]
        public ActionResult MakeReservation([FromBody] RentalDetailsDto dto)
        {
            _rentalService.MakeReservation(dto);

            return Ok("Success!");
        }
    }
}
