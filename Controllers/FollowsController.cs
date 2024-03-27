using FriendlyFlavors.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneFriendlyFlavors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowsController : ControllerBase
    {
        private FriendlyFlavorsDbContext _dbContext;

        public FollowsController(FriendlyFlavorsDbContext context)
        {
            _dbContext = context;
        }

        //==============================================================================<ENDPOINTS>=============================================================================================
        //===============GETS
        //============all
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dbContext.Follows.ToList());

        }

    }
}
