using Expense_Tracker.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace Expense_Tracker.Core.UserRepo;
public class UserRepository : Repository<User>
{
    private readonly TrackerDbContext _context;
    private readonly ILogger _logger;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public UserRepository(TrackerDbContext context, ILogger logger, IConfiguration configuration, IMapper mapper) : base(context, logger)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
        _mapper = mapper;
    }

   /* public async Task<UserResponse> Register(UserRequestDTO request, RefreshToken refreshToken)
    {
        try
        {
            User user = await _context.Users.Where(user => user.Email == request.Email).FirstOrDefaultAsync();

            if (user is not null)
            {
                return new UserResponse()
                {
                    IsSuccess = false,
                    StatusMessage = "Please try new inputs",
                };
            }

            CreatePasswordHash(request.Password, out byte[] PasswordHash, out byte[] PasswordSalt);

            user = _mapper.Map<User>(request);

            user.Id = Guid.NewGuid();
            user.PasswordHash = PasswordHash;
            user.PasswordSalt = PasswordSalt;
            user.RefreshToken = refreshToken.Token;
            user.RefreshTokenCreatedAt = refreshToken.Created;
            user.RefreshTokenExpiresAt = refreshToken.Expires;

            await _context.Set<User>().AddAsync(user);

            string token = CreateToken(user);

            return new UserResponse()
            {
                AccessToken = token,
                RefreshToken = refreshToken.Token,
                IsSuccess = true,
                StatusMessage = "Successfully registered",
                UserInfo = _mapper.Map<UserResponseDTO>(user)
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "hagad", typeof(Repository<User>));
            return new UserResponse() {
                AccessToken = "",
                IsSuccess = false,
                StatusMessage = "Failed Operation",
            };
        }
    }
    public async Task<UserResponse> Login(UserRequestDTO request, RefreshToken refreshToken)
    {
        try
        {
            var user = _context.Set<User>().Where(user => user.Email == request.Email).FirstOrDefault<User>();

            if (user is null)
            {
                return new UserResponse
                {
                    StatusCode = 405,
                    StatusMessage = "Unauthorised",
                    IsSuccess = false,
                };
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return new UserResponse
                {
                    StatusCode = 405,
                    StatusMessage = "Unauthorised",
                    IsSuccess = false,
                };
            }

            string token = CreateToken(user);

            user.RefreshToken = refreshToken.Token;
            user.RefreshTokenCreatedAt = refreshToken.Created;
            user.RefreshTokenExpiresAt = refreshToken.Expires;

            return new UserResponse
            {
                StatusCode = 200,
                StatusMessage = "Successfully login",
                IsSuccess = true,
                AccessToken = token,
                RefreshToken = refreshToken.Token,
                UserInfo = _mapper.Map<UserResponseDTO>(user)
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} Login method error", typeof(Repository<User>));
            return new UserResponse()
            {
                AccessToken = "",
                IsSuccess = false,
                StatusMessage = "Failed Operation",
            };
        }
    }
    public async Task<Responses<RefreshToken>> Logout(string refreshToken)
    {
        try
        {
            if (refreshToken == null || refreshToken == "")
            {
                return new Responses<RefreshToken>()
                {
                    StatusCode = 203,
                    StatusMessage = "Unable to logout",
                    IsSuccess = false,
                };
            }

            var user = _context.Set<User>().Where(user => user.RefreshToken == refreshToken).FirstOrDefault<User>();

            user.RefreshToken = "";

            return new Responses<RefreshToken>()
            {
                StatusCode = 200,
                StatusMessage = "Successfully Logout",
                IsSuccess = true,
            };
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "{Repo} refresh method error", typeof(Repository<RefreshToken>));
            return new Responses<RefreshToken>()
            {
                IsSuccess = false,
                StatusMessage = "Failed to logout",
            };
        }
    }
    public async Task<decimal> GetBalance(Guid UserId)
    {
        var user = await _context.Set<User>().Where(user => user.Id == UserId).FirstOrDefaultAsync();
        if(user is null)
        {
            return 0;   
        }
        return user.Balance;
    }
    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        try
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} verifying user method error", typeof(Repository<User>));

            return false;
        }
    }
    private string CreateToken(User user)
    {
        try
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} User token creating method error", typeof(Repository<User>));

            return "";
        }
    }
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        } 
    } 
    public async Task<UserResponse> CheckUserRefreshToken(string refreshToken)
    {
        try
        {
            if (refreshToken == null || refreshToken == "") {
                return new UserResponse
                {
                    StatusCode = 404,
                    StatusMessage = "Unauthorised operations",
                    IsSuccess = true,
                    AccessToken = "",
                };
            }

            User user = await context.Users.Where(user => user.RefreshToken == refreshToken).FirstOrDefaultAsync();

            if (user is null)
            {
                return new UserResponse
                {
                    StatusCode = 404,
                    StatusMessage = "Unauthorised",
                    IsSuccess = false,
                    AccessToken = "",
                };
            }

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return new UserResponse
                {
                    StatusCode = 404,
                    StatusMessage = "Unauthorised operations",
                    IsSuccess = false,
                    AccessToken = "",
                };
            }
            else if (user.RefreshTokenExpiresAt < DateTime.Now)
            {
                return new UserResponse
                {
                    StatusCode = 404,
                    StatusMessage = "Unauthorised operation",
                    IsSuccess = false,
                    AccessToken = "",
                };
            }

            return new UserResponse
            {
                StatusCode = 200,
                StatusMessage = "Successfully refreshed the token",
                IsSuccess = true,
                AccessToken = CreateToken(user),
                RefreshToken = refreshToken,
                UserInfo = _mapper.Map<UserResponseDTO>(user)
            };
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "{Repo} refresh method error", typeof(Repository<User>));
            return new UserResponse()
            {
                AccessToken = "",
                IsSuccess = false,
                StatusMessage = "Failed Operation",
            };
        }
    }*/
}
