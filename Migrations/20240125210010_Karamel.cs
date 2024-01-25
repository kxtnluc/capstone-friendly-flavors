using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class Karamel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "10d180c1-d43a-4571-b269-2ef7d228b36e");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dd8fac41-f2c3-47a2-b813-2c730e7d590b", "AQAAAAEAACcQAAAAEHMX86dVkkm0c9vtRsSFaOawPHn6UT/sZWE2Gkr5mnT4rczsxO1gvBCOLSpydzJBTQ==", "8ebbb4c9-4606-4ed7-bfb1-6d2091a28b82" });

            migrationBuilder.InsertData(
                table: "CookBooks",
                columns: new[] { "Id", "Title", "UserProfileId" },
                values: new object[] { 2, "Karamel", 2 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CookBooks",
                keyColumn: "Id",
                keyValue: 2);

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
        }
    }
}
