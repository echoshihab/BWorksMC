// using System;
// using System.Net;
// using System.Threading;
// using System.Threading.Tasks;
// using Application.Errors;
// using MediatR;
// using Persistence;

// namespace Application.Activities
// {
//     public class Delete
//     {
//         public class Command : IRequest
//         {
//             public Guid Id { get; set; }
//         }

//         public class Handler : IRequestHandler<Command>
//         {
//             private readonly ApplicationDbContext _db;
//             public Handler(ApplicationDbContext db)
//             {
//                 _db = db;
//             }

//             public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
//             {
//                 var activity = await _db.Activities.FindAsync(request.Id);

//                 if (activity == null) throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });

//                 _db.Activities.Remove(activity);

//                 var success = await _db.SaveChangesAsync() > 0;

//                 if (success) return Unit.Value;

//                 throw new Exception("Problem saving changes");
//             }
//         }
//     }
// }