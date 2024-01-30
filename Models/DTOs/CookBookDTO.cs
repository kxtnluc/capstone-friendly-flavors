using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class CookBookDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    [Required]
    public string Title { get; set; }
    public string? Description { get; set; }
}