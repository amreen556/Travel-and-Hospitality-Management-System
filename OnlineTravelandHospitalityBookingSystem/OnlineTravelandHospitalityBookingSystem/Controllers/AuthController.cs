using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Implementation;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IUserRepository userRepository;
        private readonly IPaymentRepository2 paymentRepository2;

        public AuthController(UserManager<IdentityUser> userManager,
            ITokenRepository tokenRepository,
            RoleManager<IdentityRole> roleManager,
            IPaymentRepository2 paymentRepository2,
            IUserRepository userRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
            this.roleManager = roleManager;
            this.paymentRepository2 = paymentRepository2;
            this.userRepository = userRepository;
        }

        // POST: {apibaseurl}/api/auth/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var identityUser = await userManager.FindByEmailAsync(request.Email);

            if (identityUser is not null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);

                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);

                    var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());

                    var response = new LogoResponseDto2()
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken,
                        OrderBasketId = Guid.Empty
                    };

                    if (!Guid.TryParse(identityUser.Id, out var userGuid))
                    {
                        ModelState.AddModelError("", "Invalid user ID format.");
                        return ValidationProblem(ModelState);
                    }
                    var hasBasket = await paymentRepository2.UserHasBasketAsync(userGuid);
                    if (!hasBasket)
                    {
                        await paymentRepository2.CreateBasketForUserAsync(userGuid);
                    }

                    var orderBasket = await paymentRepository2.GetOrderBasketByuserGuidIdAsync(userGuid);

                    if (orderBasket != null)
                    {
                        response.OrderBasketId = orderBasket.Id;
                    }

                    //here we check if the user is also in the user table. 
                    var guidOfUser = Guid.Parse(identityUser.Id);
                    var user = await userRepository.GetByIdAsync(guidOfUser);

                    if (user == null)
                    {
                        var newuser = new User
                        {
                            Name = identityUser.UserName,
                            Email = identityUser.Email,
                            Password = string.Empty,
                            Role = string.Empty,
                            ContactNumber = string.Empty,
                            UserID = guidOfUser
                        };

                        user = await userRepository.AddAsync(newuser);
                    }

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect");
            return ValidationProblem(ModelState);
        }

        // POST: {apibaseurl}/api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

            var identityResult = await userManager.CreateAsync(user, request.Password);

            if (identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRoleAsync(user, "Reader");

                if (identityResult.Succeeded)
                {

                    //var users = new User();
                    //users.UserID = Guid.NewGuid();
                    //users.Email = request.Email;
                    //users.Password = string.Empty;
                    //users.Name = string.Empty;
                    //users.ContactNumber = string.Empty;
                    //users.Role = "Reader";
                    
                    //var created = await userRepository.AddAsync(users);
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }

        // GET: {apibaseurl}/api/auth/users
        [HttpGet]
        [Route("users")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllUsers()
        {
            var users = userManager.Users
                .Select(u => new { u.Id, u.Email, u.UserName })
                .ToList();

            return Ok(users);
        }

        [HttpGet]
        [Route("users-with-extra-info-and-roles")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsersWithExtraInfoandRoles()
        {
            var users = userManager.Users.ToList();
            var result = new List<UserWithExtraInfoAndRolesDto>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                var extraInfo = await userRepository.GetByEmailAsync(user.Email);

                if (extraInfo != null)
                {
                    result.Add(new UserWithExtraInfoAndRolesDto
                    {
                        Id = user.Id,
                        Email = user.Email,
                        UserName = user.UserName,
                        Roles = roles,

                        ExtraInfoId = extraInfo.UserID,
                        FullName = extraInfo.Name,
                        PhoneNumber = extraInfo.ContactNumber,
                        Role = extraInfo.Role
                    });
                }
            }

            return Ok(result);
        }


        [HttpPost]
        [Route("add-role-to-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRoleToUser([FromBody] AddRoleToUserRequestDto request)
        {
            // Check if role exists
            var roleExists = await roleManager.RoleExistsAsync(request.Role);
            if (!roleExists)
            {
                return Ok(new AddRoleToUserResultDto
                {
                    Success = false,
                    Message = $"Role '{request.Role}' does not exist.",
                    Email = request.Email,
                    Role = request.Role
                });
            }

            // Find user by email
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return Ok(new AddRoleToUserResultDto
                {
                    Success = false,
                    Message = $"User with email '{request.Email}' not found.",
                    Email = request.Email,
                    Role = request.Role
                });
            }

            // Add role to user
            var result = await userManager.AddToRoleAsync(user, request.Role);
            if (result.Succeeded)
            {
                return Ok(new AddRoleToUserResultDto
                {
                    Success = true,
                    Message = $"Role '{request.Role}' added to user '{request.Email}'.",
                    Email = request.Email,
                    Role = request.Role
                });
            }
            else
            {
                var errorMsg = string.Join("; ", result.Errors.Select(e => e.Description));
                return Ok(new AddRoleToUserResultDto
                {
                    Success = false,
                    Message = $"Failed to add role: {errorMsg}",
                    Email = request.Email,
                    Role = request.Role
                });
            }
        }

        [HttpPost]
        [Route("remove-all-roles-from-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveAllRolesFromUser([FromBody] RemoveAllRolesFromUserRequestDto request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return Ok(new RemoveAllRolesFromUserResultDto
                {
                    Success = false,
                    Email = request.Email,
                    RemovedRoles = new List<string>(),
                    Message = $"User with email '{request.Email}' not found."
                });
            }

            var currentRoles = await userManager.GetRolesAsync(user);
            if (currentRoles == null || !currentRoles.Any())
            {
                return Ok(new RemoveAllRolesFromUserResultDto
                {
                    Success = true,
                    Email = request.Email,
                    RemovedRoles = new List<string>(),
                    Message = "User has no roles to remove."
                });
            }

            var result = await userManager.RemoveFromRolesAsync(user, currentRoles);

            if (result.Succeeded)
            {
                return Ok(new RemoveAllRolesFromUserResultDto
                {
                    Success = true,
                    Email = request.Email,
                    RemovedRoles = currentRoles.ToList(),
                    Message = "All roles removed successfully."
                });
            }
            else
            {
                var errorMsg = string.Join("; ", result.Errors.Select(e => e.Description));
                return Ok(new RemoveAllRolesFromUserResultDto
                {
                    Success = false,
                    Email = request.Email,
                    RemovedRoles = new List<string>(),
                    Message = $"Failed to remove roles: {errorMsg}"
                });
            }
        }
        // GET: {apibaseurl}/api/auth/roles
        [HttpGet]
        [Route("roles")]
        public IActionResult GetAllRoles()
        {
            var roles = roleManager.Roles
                .Select(r => new { r.Id, r.Name })
                .ToList();

            return Ok(roles);
        }

        // GET: {apibaseurl}/api/auth/token-details
        [HttpGet]
        [Route("token-details")]
        [Authorize]
        public IActionResult GetTokenDetails()
        {
            // Get the raw token from the Authorization header
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                return BadRequest("No JWT token found in Authorization header.");

            var token = authHeader.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            // Group claims by type, allowing multiple values per type
            var claims = jwtToken.Claims
                .GroupBy(c => c.Type)
                .ToDictionary(g => g.Key, g => g.Select(c => c.Value).ToList());

            var tokenDetails = new
            {
                User = claims.TryGetValue(ClaimTypes.Name, out var name) ? name.FirstOrDefault() : null,
                Email = claims.TryGetValue(ClaimTypes.Email, out var email) ? email.FirstOrDefault() : null,
                Roles = claims.TryGetValue(ClaimTypes.Role, out var roles) ? roles : new List<string>(),
                Issuer = jwtToken.Issuer,
                Audience = jwtToken.Audiences.ToList(),
                Expiry = jwtToken.ValidTo,
                Claims = claims
            };

            return Ok(tokenDetails);
        }

        [HttpGet("me/guid")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUserId()
        {
            // Get the email from claims
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized("Email not found in token.");

            // Find the user by email
            var identityUser = await userManager.FindByEmailAsync(email);
            if (identityUser == null)
                return Unauthorized("User not found.");

            // Convert identityUser.Id to Guid
            if (!Guid.TryParse(identityUser.Id, out var userGuid))
                return Unauthorized("User ID is not a valid GUID.");

            return Ok(new { UserId = userGuid });
        }
        [HttpGet]
        [Route("reader-demo")]
        [Authorize(Roles = "Reader")]
        public IActionResult ReaderDemo()
        {
            // This endpoint is accessible only to users with the Reader role.
            return Ok(new
            {
                Message = "Hello Reader! This is a demo endpoint for the Reader role.",
                ExampleData = new { ArticleTitle = "How to Use Role-Based Authorization", AccessLevel = "Read-Only" }
            });
        }

        [HttpGet]
        [Route("writer-demo")]
        [Authorize(Roles = "Writer")]
        public IActionResult WriterDemo()
        {
            // This endpoint is accessible only to users with the Writer role.
            return Ok(new
            {
                Message = "Hello Writer! This is a demo endpoint for the Writer role.",
                ExampleData = new { ArticleTitle = "How to Write Secure Endpoints", AccessLevel = "Write" }
            });
        }

    }


    public class AddRoleToUserResultDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }

    public class AddRoleToUserRequestDto
    {
        public string Email { get; set; }
        public string Role { get; set; }
    }



    public class UserWithExtraInfoAndRolesDto
    {
        // IdentityUser info
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public IList<string> Roles { get; set; }

        // User_Extra_Info fields
        public Guid? ExtraInfoId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public string Address { get; set; }
        public DateTime? RegisteredDate { get; set; }
        public bool? IsActive { get; set; }
        public string ProfileImageUrl { get; set; }
    }

    public class RemoveAllRolesFromUserResultDto
    {
        public bool Success { get; set; }
        public string Email { get; set; }
        public List<string> RemovedRoles { get; set; }
        public string Message { get; set; }
    }

    public class RemoveAllRolesFromUserRequestDto
    {
        public string Email { get; set; }
    }

}
