using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FriendlyFlavors.Data;
using Microsoft.EntityFrameworkCore;
using FriendlyFlavors.Models;
using FriendlyFlavors.Models.DTOs;

namespace BiancasBikes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private FriendlyFlavorsDbContext _dbContext;

    public IngredientsController(FriendlyFlavorsDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_dbContext.Ingredients.ToList());

    }

    [HttpGet("{name}")]
    public IActionResult GetByName(string name)
    {
        Ingredient foundIngredient = _dbContext.Ingredients.SingleOrDefault(i => i.Name == name);

        if(foundIngredient == null)
        {
            return NotFound();
        }

        var result = new IngredientDTO
        {
            Id = foundIngredient.Id,
            Name = foundIngredient.Name
        };

        return Ok(result);
    }

    [HttpPost("{name}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Post(string name)
    {

        string modifiedName = name.Replace("+", " ");

        Ingredient i = new Ingredient
        {
            Name = modifiedName
        };

        _dbContext.Ingredients.Add(i);
        _dbContext.SaveChanges();

        return Created($"/api/ingredients/{i.Id}", i);
    }
}