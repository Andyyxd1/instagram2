using System.ComponentModel.DataAnnotations;

namespace InstagramMVC.DTOs
{
    public class NoteDto
    {
        public int NoteId { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; }

    }
}