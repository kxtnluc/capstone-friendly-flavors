using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FriendlyFlavors.Data;
using Microsoft.EntityFrameworkCore;
using FriendlyFlavors.Models;
using FriendlyFlavors.Models.DTOs;

namespace BiancasBikes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CookbooksController : ControllerBase
{
    private FriendlyFlavorsDbContext _dbContext;

    public CookbooksController(FriendlyFlavorsDbContext context)
    {
        _dbContext = context;
    }

//==============================================================================<ENDPOINTS>=============================================================================================
                                                                                                                                                        //===============GETS
                                                                                                                                                            //============all
    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.CookBooks.ToList());

    }

                                                                                                                                                            //============one
    [HttpGet("user/{userid}")]
    // [Authorize]
    public IActionResult GetByUserId(int userid)
    {
        CookBook foundCookBook = _dbContext.CookBooks.SingleOrDefault(c => c.UserProfileId == userid);

        if(foundCookBook == null)
        {
            return NotFound();
        }

        var result = new CookBookDTO 
        {
            Id = foundCookBook.Id,
            UserProfileId = foundCookBook.UserProfileId,
            Title = foundCookBook.Title
        };

        return Ok(result);

    }
//==============================================================================</ENDPOINTS>=============================================================================================

}