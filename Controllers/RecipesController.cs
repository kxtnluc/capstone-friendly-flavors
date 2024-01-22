using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FriendlyFlavors.Data;
using Microsoft.EntityFrameworkCore;
using FriendlyFlavors.Models;
using FriendlyFlavors.Models.DTOs;

namespace BiancasBikes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private FriendlyFlavorsDbContext _dbContext;

    public RecipesController(FriendlyFlavorsDbContext context)
    {
        _dbContext = context;
    }

//==============================================================================<ENDPOINTS>=============================================================================================
                                                                                                                                                        //===============GETS
    [HttpGet]
                                                                                                                                                            //============all
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Recipes.ToList());

    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        Recipe foundRecipe = _dbContext.Recipes
            .Include(r => r.RecipeIngredients)
            .ThenInclude(r => r.Ingredient)
            .Include(r => r.RecipeIngredients)
            .ThenInclude(r => r.Measurement)
            .SingleOrDefault(r => r.Id == id);

        if(foundRecipe == null)
        {
            return NotFound();
        }

        var result = new RecipeDTO
        {
            Id = foundRecipe.Id,
            CookBookId = foundRecipe.CookBookId,
            Title = foundRecipe.Title,
            Body = foundRecipe.Body,
            CookTime = foundRecipe.CookTime,
            Complexity = foundRecipe.Complexity,
            CoverImageUrl = foundRecipe.CoverImageUrl,
            RecipeIngredients = foundRecipe.RecipeIngredients.Select(ri => new RecipeIngredientDTO
            {
                Id = ri.Id,
                Amount = ri.Amount,
                IngredientId = ri.Id,
                Ingredient = new IngredientDTO
                {
                    Id = ri.Ingredient.Id,
                    Name = ri.Ingredient.Name
                },
                MeasurementId = ri.MeasurementId,
                Measurement = new MeasurementDTO
                {
                    Id = ri.Measurement.Id,
                    Type = ri.Measurement.Type
                },
                RecipeId = ri.RecipeId
            }).ToList()
        };

        return Ok(result);

    }                                                                                                                                                      //============one
//==============================================================================</ENDPOINTS>=============================================================================================


}