using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class RecipeIngredient
{
    public int Id { get; set; }
    [Required]
    public int RecipeId { get; set; }
    [Required]
    public int IngredientId { get; set; }
    public Ingredient Ingredient { get; set; }
    [Required]
    public int MeasurementId { get; set; }
    public Measurement Measurement { get; set; }
    [Required]
    public decimal Amount { get; set; }

}