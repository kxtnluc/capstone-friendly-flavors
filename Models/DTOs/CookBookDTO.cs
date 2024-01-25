using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class CookBookDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public string Title { get; set; }
}