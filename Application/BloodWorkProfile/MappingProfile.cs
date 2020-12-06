using AutoMapper;
using Domain;

namespace Application.BloodWorkProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BloodWork, BloodWorkDto>();
        }
    }
}