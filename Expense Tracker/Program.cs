namespace Expense_Tracker;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

      /*  var connectionString = builder.Configuration.GetConnectionString("Default");*/
        var connectionString = builder.Configuration.GetSection("ConnectionStrings:Default").Value;

        builder.Services.AddDbContext<TrackerDbContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        // adding json serialiser for large objects

        builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

        builder.Services.AddAutoMapper(typeof(Program).Assembly);

        /*builder.Services.AddCors(options =>
        {
            options.AddPolicy("MyAllowAllHeadersPolicy",
                policy =>
                {
                    policy.WithOrigins("http://localhost:5173/").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
        });*/






        builder.Services.AddCors(options =>
          options.AddPolicy("Dev", builder =>
          {
              // Allow multiple methods  
              builder.WithMethods("GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT")
                .AllowAnyHeader()
                .AllowCredentials()
                .SetIsOriginAllowed(origin =>
                {
                    if (string.IsNullOrWhiteSpace(origin)) return false;
                    // Only add this to allow testing with localhost, remove this line in production!  
                    if (origin.ToLower().StartsWith("http://localhost")) return true;
                    // Insert your production domain here.  
                    if (origin.ToLower().StartsWith("https://dev.mydomain.com")) return true;
                    return false;
                });
          })
        );








        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddCookie(cookie=>cookie.Cookie.Name = "refreshToken").AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        });

        //adding the unit of work to the dependency injection

        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
        });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        /*app.UseCors("MyAllowAllHeadersPolicy");*/

        app.UseCors("Dev");
        ;
        app.MapControllers();

        app.Run();
    }
}
