using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.DTOs.Project;
using TaskFlow.API.Models;

namespace TaskFlow.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(
        AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateProjectDto dto)
    {
        int userId = int.Parse(
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!
        );

        var project = new Project
        {
            Name = dto.Name,
            Description = dto.Description,
            UserId = userId
        };

        _context.Projects.Add(project);

        await _context.SaveChangesAsync();

        return Ok(project);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        int userId = int.Parse(
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!
        );

        var projects = await _context.Projects
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        int userId = int.Parse(
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!
        );

        var project = await _context.Projects
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.UserId == userId);

        if (project == null)
            return NotFound();

        return Ok(project);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    int id,
    UpdateProjectDto dto)
    {
        int userId = int.Parse(
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!
        );

        var project = await _context.Projects
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.UserId == userId);

        if (project == null)
            return NotFound();

        project.Name = dto.Name;
        project.Description = dto.Description;

        await _context.SaveChangesAsync();

        return Ok(project);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        int userId = int.Parse(
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!
        );

        var project = await _context.Projects
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.UserId == userId);

        if (project == null)
            return NotFound();

        _context.Projects.Remove(project);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
