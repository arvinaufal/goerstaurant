# Goerstaurant: Manage Restaurant Data Around You

Goerstaurant is a web-based application that serves as a public platform for discovering restaurants and an admin panel for managing restaurant data. Developed as part of the technical assessment for Goers, it provides an efficient way to browse and maintain restaurant information.

## Table of Contents
- [Goerstaurant: Manage Restaurant Data Around You](#goerstaurant-manage-restaurant-data-around-you)
  - [Table of Contents](#table-of-contents)
  - [Technology Used and How It Works](#technology-used-and-how-it-works)
    - [\> Technology Stack :](#-technology-stack-)
      - [1. **Laravel**](#1-laravel)
      - [2. **ReactJs**](#2-reactjs)
      - [4. **PostgreSQL**](#4-postgresql)
  - [Installation and Environment Setup](#installation-and-environment-setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
      - [1. Clone the repository:](#1-clone-the-repository)
      - [2. Set up the backend:](#2-set-up-the-backend)
      - [3. Set up the frontend:](#3-set-up-the-frontend)
  - [API endpoints in Laravel](#api-endpoints-in-laravel)
    - [Available Endpoints:](#available-endpoints)
  - [Contact](#contact)


## Technology Used and How It Works

### > Technology Stack :

#### 1. **Laravel**
   - **Role**: Backend Framework
   - **Description**: Laravel is used to build the RESTful API that handles data processing, authentication, and storage. It provides a robust and scalable foundation for the backend.
   - **How It Works**:
     - Laravel receives datas from the frontend via API requests.
     - It processes the datas, performs validations, and stores it in the PostgreSQL database.
     - Laravel also integrates with Gmail Notification to trigger email verification flow.

#### 2. **ReactJs**
   - **Role**: Frontend Framework
   - **Description**: ReactJs is used to build a responsive and dynamic web application that allows admin to manage restaurant data and user/visitor to find restaurants aound with filters.
   - **How It Works**:
     - The frontend communicates with the Laravel backend via REST API.
     - It provides a user-friendly interface for clients to input their data and view the data results.

#### 4. **PostgreSQL**
   - **Role**: Database
   - **Description**: PostgreSQL is used as the primary database to store client data and request details.
   - **How It Works**:
     - All client data and request information are securely stored in PostgreSQL.
     - The Laravel backend interacts with PostgreSQL to retrieve and update data as needed.
<br>

## Installation and Environment Setup

### Prerequisites
- NodeJs 22.x (Latest)
- Php
- Web server
- Node.js and npm
- PostgreSQL
- Git

### Steps
#### 1. Clone the repository:
  + Clone the github repository
    ```bash
    git clone https://github.com/arvinaufal/goerstaurant
    ```
  + Move to the project folder
    ```bash
    cd goerstaurant
    ```

#### 2. Set up the backend:
  + Move to the backend project folder from your root project folder
    ```bash
      cd goerstaurant-server
    ```

  + Install the required packages
    ```bash
      composer i
    ```
  + In the backend project folder, add a `.env` file

  + Create the database on your local computer or live database

  + Run the migration and seeder
    ```bash
        php artisan migrate:refresh --seed
    ```

  + Run the development server
    ```bash
        php artisan serve
    ```

#### 3. Set up the frontend:
  + Move to the frontend project folder from your root project folder
    ```bash
      cd goerstaurant-app
    ```
  + Install the required packages
    ```bash
        npm install
    ```

  + Run the development project
    ```bash
      npm run dev
    ```

## API endpoints in Laravel
### Available Endpoints:

 + /api/restaurants - API for CRUD Restaurants.

 + /api/login - API for Login.
 + /api/register - API for Register.
 + /api/verify - API for Verify Account.
 + /api/report - API for report.


## Contact

If you have any questions or encounter any problems during the installation, please do not hesitate to contact me on WhatsApp: +625175104250 or on Gmail: arvinaufalagustian@gmail.com