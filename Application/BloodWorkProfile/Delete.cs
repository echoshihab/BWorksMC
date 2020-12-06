using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BloodWorkProfile
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _db;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext db, IUserAccessor userAccessor)
            {
                _db = db;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bloodWork = await _db.BloodWorks.FindAsync(request.Id);

                if (bloodWork == null) throw new RestException(HttpStatusCode.NotFound, new { error = "Invalid Request" });
                var user = await _db.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (bloodWork.AppUserId != user.Id) throw new RestException(HttpStatusCode.NotFound, new { error = "Invalid Request" });

                _db.BloodWorks.Remove(bloodWork);

                var success = await _db.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}