using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using FriendlyFlavors.Models;
using Microsoft.AspNetCore.Identity;

namespace FriendlyFlavors.Data;
public class FriendlyFlavorsDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<CookBook> CookBooks { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Measurement> Measurements { get; set; }


    public FriendlyFlavorsDbContext(DbContextOptions<FriendlyFlavorsDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(
            new UserProfile
            {
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                Address = "101 Main Street",
                Email = "admina@strator.comx",
                UserName = "admingirly"
            }
        );

        //===============================================DATABASE SEEDING PART 2========================================================
        modelBuilder.Entity<Ingredient>().HasData(
            new Ingredient { Id = 1, Name = "Flour" },
            new Ingredient { Id = 2, Name = "Sugar" },
            new Ingredient { Id = 3, Name = "Salt" },
            new Ingredient { Id = 4, Name = "Butter" },
            new Ingredient { Id = 5, Name = "Eggs" },
            new Ingredient { Id = 6, Name = "Milk" },
            new Ingredient { Id = 7, Name = "Baking Powder" },
            new Ingredient { Id = 8, Name = "Vanilla Extract" },
            new Ingredient { Id = 9, Name = "Olive Oil" },
            new Ingredient { Id = 10, Name = "Onions" },
            new Ingredient { Id = 11, Name = "Garlic" },
            new Ingredient { Id = 12, Name = "Tomatos" },
            new Ingredient { Id = 13, Name = "Chicken Breast" },
            new Ingredient { Id = 14, Name = "Beef" },
            new Ingredient { Id = 15, Name = "Potatoes" },
            new Ingredient { Id = 16, Name = "Carrots" },
            new Ingredient { Id = 17, Name = "Broccoli" },
            new Ingredient { Id = 18, Name = "Spinach" },
            new Ingredient { Id = 19, Name = "Cheese" },
            new Ingredient { Id = 20, Name = "Pasta"},
            new Ingredient { Id = 21, Name = "softened Butter"},
            new Ingredient { Id = 22, Name = "Lemon Zest"},
            new Ingredient { Id = 23, Name = "Lemon Juice"},
            new Ingredient { Id = 24, Name = "large Eggs"},
            new Ingredient { Id = 25, Name = "all-purpose Flour"},
            new Ingredient { Id = 26, Name = "Confectioner's Sugar"}

        );

        modelBuilder.Entity<CookBook>().HasData(
            new CookBook {Id = 1, UserProfileId = 1, Title = "The First Cookbook", Description = "the best cookbook"},
            new CookBook {Id = 2, UserProfileId = 2, Title = "Karamel", Description = "the second best"}
            // new CookBook {Id = 3, UserProfileId = 3}

        );

        modelBuilder.Entity<Measurement>().HasData(
            new Measurement { Id = 1, Type = "Cup"},
            new Measurement { Id = 2, Type = "Tablespoon", Abv = "tbsp" },
            new Measurement { Id = 3, Type = "Teaspoon", Abv = "tsp" },
            new Measurement { Id = 4, Type = "Pound", Abv = "lbs" },
            new Measurement { Id = 5, Type = "Ounce", Abv = "oz" },
            new Measurement { Id = 6, Type = "Gram", Abv = "gm" },
            new Measurement { Id = 7, Type = "Quart", Abv = "qt" },
            new Measurement { Id = 8, Type = "Whole", Abv = ""}, //like a Whole Egg, or Whole Vanila Bean
            new Measurement { Id = 9, Type = "Fluid Ounce", Abv = "fl oz" },
            new Measurement { Id = 10, Type = "Milliliter", Abv = "mL"},
            new Measurement { Id = 11, Type = "Tub", Abv = ""},
            new Measurement { Id = 12, Type = "Can", Abv = ""}

        );

        // modelBuilder.Entity<Recipe>().HasData(
        //     new Recipe
        //     {
        //         Id = 1,
        //         CookBookId = 1,
        //         Title = "The Best Recipe Ever",
        //         Body = "1. Preheat Oven To 350°F and line a baking sheet with parchment paper. 2. In a large bowl, cream together softened butter and brown sugar until light and fluffy. 3. Add eggs one at a time, beating well after each addition. 4. In a separate bowl, whisk together all-purpose flour, baking soda, and a pinch of salt. 5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. 6. Fold in chocolate chips or your favorite mix-ins (e.g., nuts, dried fruits). 7. Use a cookie scoop to drop rounded tablespoons of dough onto the prepared baking sheet. 8. Bake in the preheated oven for 10-12 minutes or until the edges are golden brown. 9. Allow the cookies to cool on the baking sheet for 5 minutes before transferring them to a wire rack to cool completely. 10. Enjoy your delicious homemade cookies with a glass of milk!",
        //         CookTime = 1,
        //         Complexity = 2
        //     }
        // );

        modelBuilder.Entity<RecipeIngredient>().HasData(
            new RecipeIngredient
            {
                Id = 1,
                RecipeId = 1,
                IngredientId = 4, //Butter
                MeasurementId = 2, //Tablespoons of Butter
                Amount = 8 //8 Tablespoons of Butter
            },
            new RecipeIngredient
            {
                Id = 2,
                RecipeId = 1,
                IngredientId = 5, //Egg
                MeasurementId = 8, //Whole Egg
                Amount = 2 //2 Whole Eggs
            }
        );

    }
}