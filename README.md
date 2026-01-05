# Online-Travel-and-Hospitality-Booking-System

# .NET 8 + Angular 17 Full Stack Application

## 📌 Project Overview
This is a full-stack web application built using **.NET 8 Web API**, **Angular 17**, and **SQL Server**.
The project follows a layered architecture and demonstrates frontend–backend integration with database-first approach using Entity Framework Core.

---

## 🛠️ Tech Stack
- Backend: .NET 8 Web API
- Frontend: Angular 17
- Database: SQL Server
- ORM: Entity Framework Core (DB First)
- Tools: Visual Studio, VS Code, Git, GitHub

---

## 📂 Project Structure
Backend/ → .NET 8 Web API
Frontend/ → Angular 17 application


---

## 🚀 How to Run the Project

### 🔹 Backend (.NET 8 Web API)

1. Open the **Backend** folder in **Visual Studio**
2. Update SQL Server connection string in `appsettings.json`
3. Open **Package Manager Console**
4. Run the following commands to connect backend to database:

```powershell```
Add-Migration MigrationOne -Context ApplicationDbContext
Update-Database -Context ApplicationDbContext

##Run the project
dotnet run

Backend API will run at:
https://localhost:5001

🔹 Frontend (Angular 17)

*Open Frontend folder in VS Code

--Install dependencies:

npm install
ngx-cookie-service@16

--Start Angular application:
ng serve

--Open browser:
http://localhost:4200

🗄️ Database

-SQL Server is used as the database

-Entity Framework Core with DB First approach

-Migrations are used to create and update database schema

✅ Features

RESTful APIs using .NET 8

Angular 17 components and services

CRUD operations

EF Core DB First approach

Clean separation of frontend and backend

👩‍💻 Author

***Amreen Banu***
