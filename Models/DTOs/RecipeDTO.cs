using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class RecipeDTO
{
    public int Id { get; set; }
    [Required]
    public int CookBookId { get; set; }
    public CookBookDTO? CookBook {get; set;}
    [MaxLength(180, ErrorMessage = "Ingredient Name Too Long")]
    public string? Description { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Body { get; set; }
    [Required]
    public int CookTime { get; set; }
    [Required]
    public int Complexity { get; set; }
    public string? CoverImageUrl { get; set; }
    public List<RecipeIngredientDTO>? RecipeIngredients { get; set; }
}