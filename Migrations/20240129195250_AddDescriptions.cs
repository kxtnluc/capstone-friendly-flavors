using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class AddDescriptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Recipes",
                type: "character varying(180)",
                maxLength: 180,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "00d119d7-5e4e-4f0c-841b-adb1fc7caaf4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a7365540-a993-4fbf-95e9-f39e6b6509f8", "AQAAAAEAACcQAAAAEGQtm3J1FXrcn0n/4+pwNiIe0kPMfb8ZGu8LJYpDIRBo52r45+PCr4wmC9kz+LLGqw==", "ae2fdc7e-181f-459c-bebd-4c58d45dc455" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Recipes");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "ed4d28dd-7f7d-4c34-a979-7df30f42b8c2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "18f96cef-80b7-4032-a960-8da29fb85161", "AQAAAAEAACcQAAAAEE1i1LWEE6cUnVFh8ox3BHUGfrTNU32fE9aM7lKOdTExauf2i5yVE3E6u/b8y/Mq9A==", "ba95b9d7-599e-42fd-aa4e-ddcb1427f17c" });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Body", "Complexity", "CookBookId", "CookTime", "CoverImageUrl", "Title" },
                values: new object[] { 1, "1. Preheat Oven To 350°F and line a baking sheet with parchment paper. 2. In a large bowl, cream together softened butter and brown sugar until light and fluffy. 3. Add eggs one at a time, beating well after each addition. 4. In a separate bowl, whisk together all-purpose flour, baking soda, and a pinch of salt. 5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. 6. Fold in chocolate chips or your favorite mix-ins (e.g., nuts, dried fruits). 7. Use a cookie scoop to drop rounded tablespoons of dough onto the prepared baking sheet. 8. Bake in the preheated oven for 10-12 minutes or until the edges are golden brown. 9. Allow the cookies to cool on the baking sheet for 5 minutes before transferring them to a wire rack to cool completely. 10. Enjoy your delicious homemade cookies with a glass of milk!", 2, 1, 1, null, "The Best Recipe Ever" });
        }
    }
}
