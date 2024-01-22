using System.ComponentModel.DataAnnotations;
using FriendlyFlavors.Models.DTOs;

namespace FriendlyFlavors.Models;

public class RecipeIngredientDTO
{
    public int Id { get; set; }
    [Required]
    public int RecipeId { get; set; }
    [Required]
    public int IngredientId { get; set; }
    public IngredientDTO Ingredient { get; set; }
    [Required]
    public int MeasurementId { get; set; }
    public MeasurementDTO Measurement { get; set; }
    [Required]
    public decimal Amount { get; set; }

}