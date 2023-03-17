using RentingTesla.Entities;

namespace RentingTesla.Models
{
    public class RentalDetailsPostDto
    {
        public string BorrowerFirstName { get; set; }
        public string BorrowerLastName { get; set; }
        public string BorrowerEmail { get; set; }
        public string BorrowerPhoneNumber { get; set; }
        public int PickupLocationId { get; set; }
        public DateTime PickupDate { get; set; }
        public int ReturnLocationId { get; set; }
        public DateTime ReturnDate { get; set; }
        public int CarId { get; set; }
    }
}