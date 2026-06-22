using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.DTOs.Auth;
using TaskFlow.API.Interfaces;
using TaskFlow.API.Models;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthController(
        AppDbContext context,
        IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var exists = await _context.Users
            .AnyAsync(x => x.Email == dto.Email);

        if (exists)
            return BadRequest("Email already exists");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok("User Registered");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
            return Unauthorized();

        bool valid =
            BCrypt.Net.BCrypt.Verify(
                dto.Password,
                user.PasswordHash
            );

        if (!valid)
            return Unauthorized();

        string token =
            _jwtService.GenerateToken(user);

        return Ok(new AuthResponseDto
        {
            Token = token,
            Name = user.Name,
            Email = user.Email
        });
    }
}