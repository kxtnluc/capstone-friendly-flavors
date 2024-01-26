using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class Ingredient
{
    public int Id { get; set; }
    [Required] [MaxLength(30, ErrorMessage = "Ingredient Name Too Long")]
    public string Name { get; set; }
}