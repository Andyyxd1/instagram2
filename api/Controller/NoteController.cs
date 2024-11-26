using Microsoft.AspNetCore.Mvc;
using InstagramMVC.Models;
using InstagramMVC.DAL;
using InstagramMVC.ViewModels;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using InstagramMVC.DTOs;

namespace InstagramMVC.Controllers;

[ApiController]
[Route("api/Note")]
public class NoteController : ControllerBase
{
    private readonly ILogger<NoteController> _logger;
    private readonly ICommentRepository _commentRepository;
    private readonly INoteRepository _noteRepository;

    public NoteController(INoteRepository noteRepository, ICommentRepository commentRepository, ILogger<NoteController> logger)
    {
        _noteRepository = noteRepository;
        _commentRepository = commentRepository;
        _logger = logger;
    }

    [HttpGet("GetNotes")]
    public async Task<IActionResult> GetNotes()
    {
        var notes = await _noteRepository.GetAll();
        if (notes == null)
        {
            _logger.LogError("[NoteController] Could not retrieve notes.");
            return NotFound(new { Message = "Notes not found." });
        }
        var noteDtos = notes.Select(note => new NoteDto
        {
            NoteId = note.NoteId,
            Title = note.Title,
            Content = note.Content,
        });        
        return Ok(noteDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNoteById(int id)
    {
        var note = await _noteRepository.GetNoteById(id);
        if (note == null)
        {
            _logger.LogError("[NoteController] Note not found for the NoteId: {NoteId}", id);
            return NotFound(new { Message = "Note not found." });
        }

        return Ok(note);
    }


    // Delete a note
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        // Fetch the note to ensure it exists and belongs to the current user
        var note = await _noteRepository.GetNoteById(id);
        if (note == null)
        {
            _logger.LogError("[NoteController] Note not found for deletion. NoteId: {NoteId}", id);
            return NotFound(new { Message = "Note not found." });
        }


        // Perform the deletion
        bool success = await _noteRepository.DeleteConfirmed(id);
        if (!success)
        {
            _logger.LogError("[NoteController] Note with ID {NoteId} could not be deleted.", id);
            return StatusCode(500, new { Message = "Failed to delete note. Please try again later." });
        }

        // Return a success response
        return NoContent(); // 204 No Content response indicates success with no payload
    }

    [HttpPost]
    public async Task<IActionResult> Create(Note note)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("[NoteController] Invalid model state for note creation.");
            return BadRequest(ModelState);
        }

        await _noteRepository.Create(note);

        return CreatedAtAction(nameof(GetNoteById), new { id = note.NoteId }, note);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Edit(int id, Note updatedNote)
    {
        if (id != updatedNote.NoteId || !ModelState.IsValid)
        {
            return BadRequest(new { Message = "Invalid note data." });
        }

        var existingNote = await _noteRepository.GetNoteById(id);
        if (existingNote == null)
        {
            _logger.LogError("[NoteController] Note not found for update. NoteId: {NoteId}", id);
            return NotFound(new { Message = "Note not found." });
        }

        existingNote.Title = updatedNote.Title;
        existingNote.Content = updatedNote.Content;
        existingNote.UploadDate = DateTime.Now;

        await _noteRepository.Edit(existingNote);

        return NoContent();
    }

}
