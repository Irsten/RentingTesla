using RentingTesla.Entities;

namespace RentingTesla.Models
{
    public class RentalDetailsDto
    {
        public string BorrowerFirstName { get; set; }
        public string BorrowerLastName { get; set; }
        public string BorrowerEmail { get; set; }
        public string BorrowerPhoneNumber { get; set; }
        public string PickupLocation { get; set; }
        public DateTime PickupDate { get; set; }
        public string ReturnLocation { get; set; }
        public DateTime ReturnDate { get; set; }
        public int RentalCost { get; set; }
        public int CarId { get; set; }
    }
}
