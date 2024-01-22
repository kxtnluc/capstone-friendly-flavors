using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class Ingredient
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}