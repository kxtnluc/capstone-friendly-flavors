using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FriendlyFlavors.Data;
using Microsoft.EntityFrameworkCore;
using FriendlyFlavors.Models;
using FriendlyFlavors.Models.DTOs;
using Microsoft.OpenApi.Expressions;

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
                                                                                                                                                            //============all
    [HttpGet]
    // [Authorize]
    public IActionResult Get(int? cookBookId)
    {
        IQueryable<Recipe> query = _dbContext.Recipes;

        if(cookBookId.HasValue)
        {
            query = query.Where(r => r.CookBookId == cookBookId);
        }

        var result = query
            .Select(r => new RecipeDTO
            {
                Id = r.Id,
                CookBookId = r.CookBookId,
                CoverImageUrl = r.CoverImageUrl,
                Title = r.Title,
                Body = r.Body,
                CookTime = r.CookTime,
                Complexity = r.Complexity
            }).ToList();

        return Ok(result);

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
                    Type = ri.Measurement.Type,
                    Abv = ri.Measurement.Abv
                },
                RecipeId = ri.RecipeId
            }).ToList()
        };

        return Ok(result);

    }                                                                                                                                                      //============one

                                                                                                                                                        //=================POSTS
                                                                                                                                                            //recipe+ingredients
[HttpPost("composite")]
public IActionResult CreateRecipeComposition([FromBody] CompositeDataDTO compositeData)
{
    // Access compositeData.RecipeData and compositeData.IngredientData
    // Perform database operations to save data in the respective tables

    if(compositeData.RecipeData == null || compositeData.RecipeIngredientData == null) return BadRequest();

    Recipe recipeToPost = new Recipe
    {
        CoverImageUrl = compositeData.RecipeData.CoverImageUrl,
        Title = compositeData.RecipeData.Title,
        Body = compositeData.RecipeData.Body,
        CookTime = compositeData.RecipeData.CookTime,
        Complexity = compositeData.RecipeData.Complexity,
        CookBookId = compositeData.RecipeData.CookBookId
    };

    _dbContext.Recipes.Add(recipeToPost);
    _dbContext.SaveChanges();

    List<RecipeIngredient> recipeIngredients = compositeData.RecipeIngredientData.Select(ri => new RecipeIngredient
    {
        RecipeId = recipeToPost.Id,
        IngredientId = ri.IngredientId,
        MeasurementId = ri.MeasurementId,
        Amount = ri.Amount
    }).ToList();

    foreach (RecipeIngredient ri in recipeIngredients)
    {
        _dbContext.RecipeIngredients.Add(ri);
    }

        _dbContext.SaveChanges();


    // Example:
    // _dbContext.Recipes.Add(compositeData.RecipeData);
    // _dbContext.RecipeIngredients.Add(compositeData.RecipeIngredientData.ToEntity());

    // _dbContext.SaveChanges();

    return Created($"/api/recipes/{recipeToPost.Id}", recipeToPost);
}
                                                                                                                    
//==============================================================================</ENDPOINTS>=============================================================================================


}