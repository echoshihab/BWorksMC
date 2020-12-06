using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BloodWorkProfile
{
    public class List
    {
        public class BloodWorksEnvelope
        {
            public List<BloodWorkDto> BloodWorks { get; set; }
            public int BloodWorksCount { get; set; }
        }
        public class Query : IRequest<BloodWorksEnvelope>
        {


        }

        public class Handler : IRequestHandler<Query, BloodWorksEnvelope>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext db, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _db = db;
            }
            public async Task<BloodWorksEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var queryable = _db.BloodWorks
                                .OrderBy(x => x.DateCreated)
                                .AsQueryable();


                queryable = queryable.Where(x => x.AppUser.UserName == _userAccessor.GetCurrentUserName());


                var bloodWorks = await queryable.ToListAsync();




                return new BloodWorksEnvelope
                {
                    BloodWorks = _mapper.Map<List<BloodWork>, List<BloodWorkDto>>(bloodWorks),
                    BloodWorksCount = queryable.Count()
                };


            }
        }

    }
}