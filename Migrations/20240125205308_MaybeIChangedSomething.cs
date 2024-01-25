using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class MaybeIChangedSomething : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "UserProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "6793233f-9f3f-4181-a94b-e9f9b15e96e5");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d6108b6e-f9cd-4deb-b98d-1511a97e8ca3", "AQAAAAEAACcQAAAAEBYlsR3ElvkehRrzc8ffZaon9I/KQ95FNTJWFcYkCIsjKCi6f2wZYQAgfn1JLqITzA==", "c7ba295d-dafc-4f97-a2ce-54cf99bc063d" });

            migrationBuilder.UpdateData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserName",
                value: "admingirly");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "UserProfiles");

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
        }
    }
}
