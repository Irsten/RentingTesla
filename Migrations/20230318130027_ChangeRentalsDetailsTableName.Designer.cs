﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RentingTesla.Entities;

#nullable disable

namespace RentingTesla.Migrations
{
    [DbContext(typeof(RentingTeslaDbContext))]
    [Migration("20230318130027_ChangeRentalsDetailsTableName")]
    partial class ChangeRentalsDetailsTableName
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("RentingTesla.Entities.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PricePerDay")
                        .HasColumnType("int");

                    b.Property<int>("Range")
                        .HasColumnType("int");

                    b.Property<int>("Seats")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("RentingTesla.Entities.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("LocationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("RentingTesla.Entities.ReservationDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("BorrowerEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BorrowerFirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BorrowerLastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BorrowerPhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CarId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PickupDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PickupLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RentalCost")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ReturnLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("ReservationsDetails");
                });

            modelBuilder.Entity("RentingTesla.Entities.Car", b =>
                {
                    b.HasOne("RentingTesla.Entities.Location", "Location")
                        .WithMany("Cars")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("RentingTesla.Entities.ReservationDetails", b =>
                {
                    b.HasOne("RentingTesla.Entities.Car", "Car")
                        .WithMany()
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");
                });

            modelBuilder.Entity("RentingTesla.Entities.Location", b =>
                {
                    b.Navigation("Cars");
                });
#pragma warning restore 612, 618
        }
    }
}
