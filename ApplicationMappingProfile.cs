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
            CreateMap<RentalDetails, RentalDetailsPostDto>();
            CreateMap<RentalDetails, RentalDetailsGetDto>()
                .ForMember(m => m.Car, c => c.MapFrom(s => s.Car));
        }
    }
}