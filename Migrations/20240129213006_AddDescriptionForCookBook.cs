using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class AddDescriptionForCookBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CookBooks",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "add41ae3-9b63-4bab-b9f7-148f739191d1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cc94f587-efdd-41b8-aef7-2a870b08e505", "AQAAAAEAACcQAAAAEDiZR4WpvxvPUN4nnMqBZ1+5/htgp/PR8Wxr41kBwEu4AAij95QUVz0CHx0GGGJHkQ==", "fb63df8e-3a08-4a2d-802a-75ef285d53d9" });

            migrationBuilder.CreateIndex(
                name: "IX_CookBooks_UserProfileId",
                table: "CookBooks",
                column: "UserProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_CookBooks_UserProfiles_UserProfileId",
                table: "CookBooks",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CookBooks_UserProfiles_UserProfileId",
                table: "CookBooks");

            migrationBuilder.DropIndex(
                name: "IX_CookBooks_UserProfileId",
                table: "CookBooks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "CookBooks");

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
    }
}
