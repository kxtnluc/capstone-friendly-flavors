using FriendlyFlavors.Models;
using FriendlyFlavors.Models.DTOs;

namespace FriendlyFlavors.Models.DTOs;

public class RiCompositeDTO
{
    public List<RecipeIngredient> RiAdd { get; set; }
    public List<RecipeIngredient> RiDelete { get; set; }

}