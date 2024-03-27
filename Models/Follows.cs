using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class Follows
{
    public int Id { get; set; }
    [Required]
    public int FollowerUserId { get; set; }
    public int FollowingUserId { get; set; }
    public UserProfile FollowerUser { get; set; }
    public UserProfile FollowingUser { get; set; }
}