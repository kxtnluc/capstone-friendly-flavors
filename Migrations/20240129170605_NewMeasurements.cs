using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneFriendlyFlavors.Migrations
{
    public partial class NewMeasurements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Ingredients",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "01072f0a-46e3-41fd-8984-bb93c59c3586");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "03b799c8-a256-4a78-be23-cf3b918cd03d", "AQAAAAEAACcQAAAAEIjhptDPCtJQDNZqzRSmh+hjXChR7/R7wLXfQBRFiyvrz+i1Q2HV+KRJ9qLEnyjB7A==", "74cb5bc0-b375-45db-83de-b3360d6f9244" });

            migrationBuilder.InsertData(
                table: "Measurements",
                columns: new[] { "Id", "Abv", "Type" },
                values: new object[,]
                {
                    { 11, "", "Tub" },
                    { 12, "", "Can" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CookBookId",
                table: "Recipes",
                column: "CookBookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_CookBooks_CookBookId",
                table: "Recipes",
                column: "CookBookId",
                principalTable: "CookBooks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_CookBooks_CookBookId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CookBookId",
                table: "Recipes");

            migrationBuilder.DeleteData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Measurements",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Ingredients",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "5ec9e155-bbe0-431e-ba6c-25a9ec6ac6a9");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "964156e8-f2aa-4f9e-b374-2a852f3a5ea7", "AQAAAAEAACcQAAAAEMTXGqUVUSf2YD3evY487TX57wbtavIxpiMPMnUpgivzU9DRwIX+5JwU5X3Pf3iAkg==", "09866b78-5e01-4b46-8299-ec4f9b7da692" });
        }
    }
}
