using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class Friends
{
    public int Id { get; set; }
    [Required]
    public int FriendUserOneId { get; set; }
    [Required]
    public int FriendUserTwoId { get; set; }
    public UserProfile? FriendUserOne { get; set; }
    public UserProfile? FriendUserTwo { get; set; }
    public bool? Accepted { get; set; }
}