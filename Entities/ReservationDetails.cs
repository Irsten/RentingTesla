namespace RentingTesla.Entities
{
    public class ReservationDetails
    {
        public int Id { get; set; }
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
        public virtual Car Car { get; set; }
    }
}
