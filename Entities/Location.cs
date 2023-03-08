namespace RentingTesla.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string LocationName { get; set; }
        public virtual List<Car>? Cars { get; set; }
    }
}
