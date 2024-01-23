using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models;

public class Measurement
{
    public int Id { get; set; }
    [Required]
    public string Type { get; set; }
    public string? Abv { get; set; }
}