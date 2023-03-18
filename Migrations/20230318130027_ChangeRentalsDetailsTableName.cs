using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentingTesla.Migrations
{
    public partial class ChangeRentalsDetailsTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RentalsDetails");

            migrationBuilder.CreateTable(
                name: "ReservationsDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BorrowerFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BorrowerLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BorrowerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BorrowerPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PickupLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PickupDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RentalCost = table.Column<int>(type: "int", nullable: false),
                    CarId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationsDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservationsDetails_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationsDetails_CarId",
                table: "ReservationsDetails",
                column: "CarId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationsDetails");

            migrationBuilder.CreateTable(
                name: "RentalsDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    BorrowerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BorrowerFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BorrowerLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BorrowerPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PickupDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PickupLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RentalCost = table.Column<int>(type: "int", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnLocation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalsDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalsDetails_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RentalsDetails_CarId",
                table: "RentalsDetails",
                column: "CarId");
        }
    }
}
