# RentingTesla

Simple web application for renting Tesla in Mallorca.

## How to run the application

### Database

To start using the application you need to change **__connectionString_** in **_RentingTeslaDbContex.cs_** file to one that can connect to your local server. Then if you are using Visual Studio u can use **Tools>NuGet Package Manager>Package Manager Console** and write the command **_update-database_**. If you don't use Visual Studio you can run **.NET CLI** and write command **_dotnet ef database update_**.

### Seeder

**_RentingTeslaSeeder.cs_** checks if database contains any records for **Locations** and **Cars**. If not, the seeder inserts locations and cars into the database.

### Client app

If you are using Visual Studio Code you you must open a terminal and write the command **_npm install_** to install all necessary packages or you can open the CLI and select the directory where you put the application and use the command **_npm install_**.

## How the application works

There are 3 tables in the database: **Locations**, **Cars** and **ReservationsDetails**. The user can only add new reservations but cannot enter data into the first two tables.

There are 4 locations available (Palma Airport, Palma City Center, Alcudia and Manacor), and each location has 8 cars available for rent (2 of each model: S, 3, X, Y). Each car includes information on how many seats it has, its range when fully charged and its daily rental cost. A car can be rented and returned at any of the available locations.

To make a reservation, the user must fill out a form in which he selects the location where he will pick up and return the car and the time for which he wants to rent the car, as well as provide his personal information (name, surname, email, phone number). After successfully making a reservation, a new reservation record is created in the database and the user is redirected to a page with all the details about his reservation and can print them to a pdf file.

The record of the rented car in the database is overwritten and its **_LocationId_** is changed to the **_Id_** of the location where the car will be returned, but it is not visible to the user until its return date has passed.
