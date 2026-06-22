using TaskFlow.API.Models;

namespace TaskFlow.API.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}