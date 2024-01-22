using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class IngredientDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}