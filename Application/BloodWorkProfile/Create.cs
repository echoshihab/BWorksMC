using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BloodWorkProfile
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public DateTime DateCreated { get; set; }
            public string Description { get; set; }
            public DateTime ExamDate { get; set; }
            public DateTime ResultsDate { get; set; }
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
                RuleFor(x => x.Description).NotEmpty().MinimumLength(5).WithMessage("Description with at least 5 characters required");
                RuleFor(x => x.DateCreated).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.ExamDate).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.ResultsDate).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
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
                var user = await _db.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var bloodWork = new BloodWork
                {
                    Id = request.Id,
                    Description = request.Description,
                    DateCreated = request.DateCreated,
                    ExamDate = request.ExamDate,
                    ResultsDate = request.ResultsDate,
                    Hemoglobin = request.Hemoglobin,
                    Hematocrit = request.Hematocrit,
                    WBCellsCount = request.WBCellsCount,
                    RBCellsCount = request.RBCellsCount,
                    AppUserId = user.Id

                };

                _db.BloodWorks.Add(bloodWork);


                var success = await _db.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}


