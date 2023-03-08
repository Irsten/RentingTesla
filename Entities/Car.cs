namespace RentingTesla.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public int Seats { get; set; }
        public int Range { get; set; }
        public int PricePerDay { get; set; }
        public int LocationId { get; set; }
        public virtual Location Location { get; set; }
    }
}
