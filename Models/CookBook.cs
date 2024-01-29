using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class CookBook
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    
    [Required]
    public string Title { get; set; }
    public string? Description { get; set; }
}