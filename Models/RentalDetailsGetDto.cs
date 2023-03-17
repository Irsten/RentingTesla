namespace RentingTesla.Models
{
    public class RentalDetailsGetDto
    {
        public string BorrowerFirstName { get; set; }
        public string BorrowerLastName { get; set; }
        public string BorrowerEmail { get; set; }
        public string BorrowerPhoneNumber { get; set; }
        public string PickupLocation { get; set; }
        public DateTime PickupDate { get; set; }
        public string ReturnLocation { get; set; }
        public DateTime ReturnDate { get; set; }
        public CarDto Car { get; set; }
        public int RentalCost { get; set; }
    }
}