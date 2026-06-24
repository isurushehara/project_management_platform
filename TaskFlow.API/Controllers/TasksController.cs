using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.DTOs.Task;
using TaskFlow.API.Models;

namespace TaskFlow.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            ProjectId = dto.ProjectId
        };

        _context.Tasks.Add(task);

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetByProject(
    int projectId)
    {
        var tasks = await _context.Tasks
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.Id)
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    int id,
    UpdateTaskDto dto)
    {
        var task = await _context.Tasks
            .FindAsync(id);

        if (task == null)
            return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.DueDate = dto.DueDate;

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
        int id)
    {
        var task = await _context.Tasks
            .FindAsync(id);

        if (task == null)
            return NotFound();

        _context.Tasks.Remove(task);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}