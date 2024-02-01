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
    public IActionResult Get()
    {
        return Ok(_dbContext.CookBooks.ToList());

    }

                                                                                                                                                            //============one
    [HttpGet("user/{userid}")]
    public IActionResult GetByUserId(int userid)
    {
        CookBook foundCookBook = _dbContext
            .CookBooks
            .Include(c => c.UserProfile)
            .SingleOrDefault(c => c.UserProfileId == userid);

        if(foundCookBook == null)
        {
            return NotFound();
        }

        var result = new CookBookDTO 
        {
            Id = foundCookBook.Id,
            UserProfileId = foundCookBook.UserProfileId,
            Title = foundCookBook.Title,
            Description = foundCookBook.Description,
            UserProfile = new UserProfileDTO
            {
                Id = foundCookBook.UserProfile.Id,
                FirstName = foundCookBook.UserProfile.FirstName,
                LastName = foundCookBook.UserProfile.LastName,
                Address = foundCookBook.UserProfile.Address,
                Email = foundCookBook.UserProfile.Email,
                UserName = foundCookBook.UserProfile.UserName
            }
        };

        return Ok(result);

    }
                                                                                                                                                            //===============POSTS
                                                                                                                                                            //=================one
    [HttpPost]
    [Authorize]
    public IActionResult PostCookBook(CookBook cookBookToPost)
    {

        if(cookBookToPost == null)
        {
            return BadRequest();
        }

        _dbContext.Add(cookBookToPost);
        _dbContext.SaveChanges();

        return Created($"/api/cookbook/{cookBookToPost.Id}", cookBookToPost);
    }  
                                                                                                                                                            //===============PUT
                                                                                                                                                            //=================one
    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateCookBook(int id, CookBook updates)
    {

        CookBook foundCookBook = _dbContext.CookBooks.SingleOrDefault(c=> c.Id == id);

        if(foundCookBook == null)
        {
            return NotFound();
        }

        Console.WriteLine(updates.Title);

        if(string.IsNullOrEmpty(updates.Title)) updates.Title = foundCookBook.Title;
        if(string.IsNullOrEmpty(updates.Description)) updates.Description = foundCookBook.Description;

        if(updates == null)
        {
            return BadRequest();
        }

        foundCookBook.Title = updates.Title;
        foundCookBook.Description = updates.Description;

        _dbContext.SaveChanges();

        return NoContent();
    }  
//==============================================================================</ENDPOINTS>=============================================================================================

}