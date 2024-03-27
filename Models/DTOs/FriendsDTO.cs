using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class FriendsDTO
{
    public int Id { get; set; }
    [Required]
    public int FriendUserOneId { get; set; }
    public int FriendUserTwoId { get; set; }
    public UserProfileDTO FriendUserOne { get; set; }
    public UserProfileDTO FriendUserTwo { get; set; }
    public bool Accepted { get; set; }
}