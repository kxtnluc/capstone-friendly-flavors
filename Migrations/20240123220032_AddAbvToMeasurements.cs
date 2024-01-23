using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class AddAbvToMeasurements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abv",
                table: "Measurements",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "757fd793-6b0f-411f-9b22-113e5fa5dabd");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "87064391-31a3-49f2-8e37-1a03cb39e5cb", "AQAAAAEAACcQAAAAEAa1ll04HtVkCe9d3QgDMh7hVcieCkQD1/ItCSkEXKosoMbm9sFzLhAKZYY6OgPuvg==", "9f3f955a-242a-4563-a70a-e7fbe0346c7a" });

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 2,
                column: "Abv",
                value: "tbsp");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 3,
                column: "Abv",
                value: "tsp");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 4,
                column: "Abv",
                value: "lbs");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 5,
                column: "Abv",
                value: "oz");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 6,
                column: "Abv",
                value: "gm");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 7,
                column: "Abv",
                value: "qt");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 8,
                column: "Abv",
                value: "");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 9,
                column: "Abv",
                value: "fl oz");

            migrationBuilder.UpdateData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 10,
                column: "Abv",
                value: "mL");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_IngredientId",
                table: "RecipeIngredients",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_MeasurementId",
                table: "RecipeIngredients",
                column: "MeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_RecipeId",
                table: "RecipeIngredients",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Ingredients_IngredientId",
                table: "RecipeIngredients",
                column: "IngredientId",
                principalTable: "Ingredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Measurements_MeasurementId",
                table: "RecipeIngredients",
                column: "MeasurementId",
                principalTable: "Measurements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeId",
                table: "RecipeIngredients",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Ingredients_IngredientId",
                table: "RecipeIngredients");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Measurements_MeasurementId",
                table: "RecipeIngredients");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeId",
                table: "RecipeIngredients");

            migrationBuilder.DropIndex(
                name: "IX_RecipeIngredients_IngredientId",
                table: "RecipeIngredients");

            migrationBuilder.DropIndex(
                name: "IX_RecipeIngredients_MeasurementId",
                table: "RecipeIngredients");

            migrationBuilder.DropIndex(
                name: "IX_RecipeIngredients_RecipeId",
                table: "RecipeIngredients");

            migrationBuilder.DropColumn(
                name: "Abv",
                table: "Measurements");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "3c92800e-6a16-4b30-b80a-9dc05a69c197");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "90f8643c-b1e5-4879-bfc9-d32d04ffdb74", "AQAAAAEAACcQAAAAEPVbGEQ4jn07gCuKwfjkg3AQ5e/2c15HSCwImfYnzBFcutwHnUB6ee2/75ob0RpMyw==", "9017ca7f-22d5-424a-b98d-d27604da4149" });
        }
    }
}
