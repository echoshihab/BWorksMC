using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.BloodWorkProfile
{
    public class Details
    {
        public class Query : IRequest<BloodWorkDto>
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BloodWorkDto>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            public Handler(DataContext db, IMapper mapper)
            {
                _mapper = mapper;
                _db = db;
            }

            public async Task<BloodWorkDto> Handle(Query request, CancellationToken cancellationToken)
            {

                var bloodWork = await _db.BloodWorks.FindAsync(request.Id);

                if (bloodWork == null) throw new RestException(HttpStatusCode.NotFound, new { bloodWork = "Not Found" });

                var bloodWorkToReturn = _mapper.Map<BloodWork, BloodWorkDto>(bloodWork);

                return bloodWorkToReturn;
            }
        }
    }
}