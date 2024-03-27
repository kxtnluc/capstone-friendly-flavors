using FriendlyFlavors.Data;
using FriendlyFlavors.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneFriendlyFlavors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private FriendlyFlavorsDbContext _dbContext;

        public FriendsController(FriendlyFlavorsDbContext context)
        {
            _dbContext = context;
        }

        //==============================================================================<ENDPOINTS>=============================================================================================
        //===============GETS
        //============all
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_dbContext.Friends.ToList());
        }

        [HttpGet("{oneUserId}")]
        public IActionResult GetByUserIds(int oneUserId, int? twoUserId)
        {
            if(twoUserId == null)
            {
                var resultList = _dbContext.Friends.Where(f => f.FriendUserOneId == oneUserId || f.FriendUserTwoId == oneUserId).ToList();
                if (resultList == null) return NotFound();
                return Ok(resultList);
            }
            if(twoUserId != null)
            {
                var resultSingle = _dbContext.Friends.SingleOrDefault(f => (f.FriendUserOneId == oneUserId && f.FriendUserTwoId == twoUserId) || (f.FriendUserOneId == twoUserId && f.FriendUserTwoId == oneUserId));
                if(resultSingle == null) return NotFound();
                return Ok(resultSingle);
            }

            return BadRequest();

        }

        [HttpPost]
        [Authorize]
        public IActionResult PostFriendRequest(Friends friendsToRequest)
        {
            if (friendsToRequest == null) return NotFound();

            friendsToRequest.Accepted = false;

            _dbContext.Add(friendsToRequest);
            _dbContext.SaveChanges();

            return Created($"/api/friends/{friendsToRequest.Id}", friendsToRequest);

        }

        [HttpPut("{id}")] 
        public IActionResult PutAccepted(int id) //the id of the table row, not the users
        {
            Friends foundFriends = _dbContext.Friends.SingleOrDefault(f => f.Id == id);
            
            if (foundFriends == null) return NotFound();

            foundFriends.Accepted = true;

            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDeclineOrCancel(int id) //the id of the table row, not the users
        {
            Friends foundFriends = _dbContext.Friends.SingleOrDefault(f => f.Id == id);

            if (foundFriends == null) return NotFound();

            _dbContext.Remove(foundFriends);

            _dbContext.SaveChanges();

            return NoContent();
        }

    }
}
