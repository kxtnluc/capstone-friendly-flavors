using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class FollowsDTO
{
    public int Id { get; set; }
    [Required]
    public int FollowerUserId { get; set; }
    public int FollowingUserId { get; set; }
    public UserProfileDTO FollowerUser { get; set; }
    public UserProfileDTO FollowingUser { get; set; }
}