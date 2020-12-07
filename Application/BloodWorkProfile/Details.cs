using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext db, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _db = db;
            }

            public async Task<BloodWorkDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var bloodWork = await _db.BloodWorks.FindAsync(request.Id);
                if (bloodWork == null) throw new RestException(HttpStatusCode.NotFound, new { error = "Invalid Request" });

                var user = await _db.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (bloodWork.AppUserId != user.Id) throw new RestException(HttpStatusCode.NotFound, new { error = "Invalid Request" });

                var bloodWorkToReturn = _mapper.Map<BloodWork, BloodWorkDto>(bloodWork);

                return bloodWorkToReturn;
            }
        }
    }
}