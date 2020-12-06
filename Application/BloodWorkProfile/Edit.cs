using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BloodWorkProfile
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public DateTime ExamDate { get; set; }
            public DateTime ResultDate { get; set; }
            public double Hemoglobin { get; set; }
            public double Hematocrit { get; set; }
            public double WBCellsCount { get; set; }
            public double RBCellsCount { get; set; }


        }

        public class CommandValidator : AbstractValidator<Command>
        {
            private bool PassDateValidation(DateTime date)
            {
                return !date.Equals(default(DateTime));
            }
            public CommandValidator()
            {
                RuleFor(x => x.ExamDate).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.ResultDate).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.Hemoglobin).NotNull().GreaterThan(0).WithMessage("Must be a valid number");
                RuleFor(x => x.Hematocrit).NotNull().GreaterThan(0).WithMessage("Must be a valid number"); ;
                RuleFor(x => x.WBCellsCount).NotNull().GreaterThan(0).WithMessage("Must be a valid number"); ;
                RuleFor(x => x.WBCellsCount).NotNull().GreaterThan(0).WithMessage("Must be a valid number"); ;

            }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _db;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext db, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _db = db;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bloodWork = await _db.BloodWorks.FindAsync(request.Id);
                if (bloodWork == null) throw new RestException(HttpStatusCode.NotFound, new { bloodWork = "Not Found" });

                var user = await _db.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (bloodWork.AppUserId != user.Id) throw new RestException(HttpStatusCode.NotFound, new { user = "Not Found" });

                bloodWork.ExamDate = request.ExamDate;
                bloodWork.ResultsDate = request.ResultDate;
                bloodWork.Hemoglobin = request.Hemoglobin;
                bloodWork.Hematocrit = request.Hematocrit;
                bloodWork.WBCellsCount = request.WBCellsCount;
                bloodWork.RBCellsCount = request.RBCellsCount;


                var success = await _db.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}


