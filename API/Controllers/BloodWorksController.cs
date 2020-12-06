using System.Threading.Tasks;
using Application.BloodWorkProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BloodWorksController : BaseController
    {


        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List.BloodWorksEnvelope>> List()
        {
            return await Mediator.Send(new List.Query());
        }





    }
}
