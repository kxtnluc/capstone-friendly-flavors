using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class Recipe
{
    public int Id { get; set; }
    [Required]
    public int CookBookId { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Body { get; set; }
    [Required]
    public int CookTime { get; set; }
    [Required]
    public int Complexity { get; set; }
    public string? CoverImageUrl { get; set; }
    public List<RecipeIngredient> RecipeIngredients { get; set; }

}