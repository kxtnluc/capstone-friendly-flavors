using FriendlyFlavors.Models;
using FriendlyFlavors.Models.DTOs;

namespace FriendlyFlavors.Models.DTOs;

public class CompositeDataDTO
{
    public RecipeDTO RecipeData { get; set; }
    public List<RecipeIngredientDTO> RecipeIngredientData { get; set; }
}