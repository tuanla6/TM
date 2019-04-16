using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManagement.Migrations
{
    public partial class ChangeStatusTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppTasks_AppStatus_StatusId",
                table: "AppTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppStatus",
                table: "AppStatus");

            migrationBuilder.RenameTable(
                name: "AppStatus",
                newName: "AppStatuses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppStatuses",
                table: "AppStatuses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppTasks_AppStatuses_StatusId",
                table: "AppTasks",
                column: "StatusId",
                principalTable: "AppStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppTasks_AppStatuses_StatusId",
                table: "AppTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppStatuses",
                table: "AppStatuses");

            migrationBuilder.RenameTable(
                name: "AppStatuses",
                newName: "AppStatus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppStatus",
                table: "AppStatus",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppTasks_AppStatus_StatusId",
                table: "AppTasks",
                column: "StatusId",
                principalTable: "AppStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
