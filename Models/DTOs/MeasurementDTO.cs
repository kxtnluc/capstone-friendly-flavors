using System.ComponentModel.DataAnnotations;

namespace FriendlyFlavors.Models.DTOs;

public class MeasurementDTO
{
    public int Id { get; set; }
    [Required]
    public string Type { get; set; }
}