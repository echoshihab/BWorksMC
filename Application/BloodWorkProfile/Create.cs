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
                RuleFor(x => x.DateCreated).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.ExamDate).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.ResultDate).NotNull().Must(PassDateValidation).WithMessage("Must be a valid date");
                RuleFor(x => x.Hemoglobin).NotNull().GreaterThan(0).WithMessage("Must be a valid number");
                RuleFor(x => x.Hematocrit).NotNull().GreaterThan(0).WithMessage("Must be a valid number");;
                RuleFor(x => x.WBCellsCount).NotNull().GreaterThan(0).WithMessage("Must be a valid number");;
                RuleFor(x => x.WBCellsCount).NotNull().GreaterThan(0).WithMessage("Must be a valid number");;

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
                    DateCreated = request.DateCreated,
                    ExamDate = request.ExamDate,
                    ResultsDate = request.ResultDate,
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


