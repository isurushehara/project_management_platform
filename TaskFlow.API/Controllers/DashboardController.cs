using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.DTOs.Dashboard;

namespace TaskFlow.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(
        AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        int userId = int.Parse(
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!
        );

        int totalProjects =
            await _context.Projects
                .CountAsync(p =>
                    p.UserId == userId);

        var projectIds =
            await _context.Projects
                .Where(p =>
                    p.UserId == userId)
                .Select(p => p.Id)
                .ToListAsync();

        int totalTasks =
            await _context.Tasks
                .CountAsync(t =>
                    projectIds.Contains(
                        t.ProjectId));

        int completedTasks =
            await _context.Tasks
                .CountAsync(t =>
                    projectIds.Contains(
                        t.ProjectId) &&
                    t.Status == "Completed");

        int pendingTasks =
            totalTasks - completedTasks;

        return Ok(new DashboardStatsDto
        {
            TotalProjects = totalProjects,
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            PendingTasks = pendingTasks
        });
    }
}