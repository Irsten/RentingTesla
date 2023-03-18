using AutoMapper;
using RentingTesla.Entities;
using RentingTesla.Models;

namespace RentingTesla
{
    public class ApplicationMappingProfile : Profile
    {
        public ApplicationMappingProfile()
        {
            CreateMap<Car, CarDto>();
            CreateMap<Location, LocationDto>();
            CreateMap<ReservationDetails, ReservationDetailsPostDto>();
            CreateMap<ReservationDetails, ReservationDetailsGetDto>()
                .ForMember(m => m.Car, c => c.MapFrom(s => s.Car));
        }
    }
}