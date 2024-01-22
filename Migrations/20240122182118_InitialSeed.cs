using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class InitialSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CookBook",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CookBook", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredient", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Measurement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Measurement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CookBookId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: false),
                    CookTime = table.Column<int>(type: "integer", nullable: false),
                    Complexity = table.Column<int>(type: "integer", nullable: false),
                    CoverImageUrl = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecipeIngredient",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RecipeId = table.Column<int>(type: "integer", nullable: false),
                    IngredientId = table.Column<int>(type: "integer", nullable: false),
                    MeasurementId = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredient", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "a2de0872-ca95-4fa9-acb2-3ed02d5eb0bb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "73c3bd8c-07bd-420a-9e93-d14064abdc50", "AQAAAAEAACcQAAAAEI/Pl05mxlewgy7lsv/3ycKywFf3ML5o2H1MjHIRpJsPb8BDBh7LS1l8wlSzjff8wQ==", "f2bfa48b-fd35-42b4-b338-fd2f234ac1b6" });

            migrationBuilder.InsertData(
                table: "CookBook",
                columns: new[] { "Id", "Title", "UserProfileId" },
                values: new object[] { 1, "The First Cookbook", 1 });

            migrationBuilder.InsertData(
                table: "Ingredient",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Flour" },
                    { 2, "Sugar" },
                    { 3, "Salt" },
                    { 4, "Butter" },
                    { 5, "Egg" },
                    { 6, "Milk" },
                    { 7, "Baking Powder" },
                    { 8, "Vanilla Extract" },
                    { 9, "Olive Oil" },
                    { 10, "Onions" },
                    { 11, "Garlic" },
                    { 12, "Tomatos" },
                    { 13, "Chicken Breast" },
                    { 14, "Beef" },
                    { 15, "Potatoes" },
                    { 16, "Carrots" },
                    { 17, "Broccoli" },
                    { 18, "Spinach" },
                    { 19, "Cheese" },
                    { 20, "Pasta" }
                });

            migrationBuilder.InsertData(
                table: "Measurement",
                columns: new[] { "Id", "Type" },
                values: new object[,]
                {
                    { 1, "Cup" },
                    { 2, "Tablespoon" },
                    { 3, "Teaspoon" },
                    { 4, "Pound" },
                    { 5, "Ounce" },
                    { 6, "Gram" },
                    { 7, "Quart" },
                    { 8, "Whole" },
                    { 9, "Fluid Ounce" },
                    { 10, "Milliliter" }
                });

            migrationBuilder.InsertData(
                table: "Recipe",
                columns: new[] { "Id", "Body", "Complexity", "CookBookId", "CookTime", "CoverImageUrl", "Title" },
                values: new object[] { 1, "1. Preheat Oven To 350°F and line a baking sheet with parchment paper. 2. In a large bowl, cream together softened butter and brown sugar until light and fluffy. 3. Add eggs one at a time, beating well after each addition. 4. In a separate bowl, whisk together all-purpose flour, baking soda, and a pinch of salt. 5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. 6. Fold in chocolate chips or your favorite mix-ins (e.g., nuts, dried fruits). 7. Use a cookie scoop to drop rounded tablespoons of dough onto the prepared baking sheet. 8. Bake in the preheated oven for 10-12 minutes or until the edges are golden brown. 9. Allow the cookies to cool on the baking sheet for 5 minutes before transferring them to a wire rack to cool completely. 10. Enjoy your delicious homemade cookies with a glass of milk!", 2, 1, 1, 0, "The Best Recipe Ever" });

            migrationBuilder.InsertData(
                table: "RecipeIngredient",
                columns: new[] { "Id", "Amount", "IngredientId", "MeasurementId", "RecipeId" },
                values: new object[,]
                {
                    { 1, 8m, 4, 2, 1 },
                    { 2, 2m, 5, 8, 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CookBook");

            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "Measurement");

            migrationBuilder.DropTable(
                name: "Recipe");

            migrationBuilder.DropTable(
                name: "RecipeIngredient");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "873d850f-1d70-44dc-a42d-51a843717299");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8da99292-3f63-479d-bad9-ae58a465b41e", "AQAAAAEAACcQAAAAEG96fSXuRWSV4XFqb1fUzzVUjCe5TP1FM+JunWNIhxTDDsFbtUu4oHALGGxZ6xopyg==", "9ff58a20-62e8-408b-ba1a-285197c45635" });
        }
    }
}
