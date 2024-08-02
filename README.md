# Kodack Backend

Kodack is a comprehensive backend solution for the Kodack web application, designed to enhance coding practice by managing and sharing coding problem lists. This backend service leverages Node.js, Express, Prisma, and PostgreSQL to deliver a robust and scalable platform.

## Project Overview

Kodack provides users with the ability to:

- Access and manage a master list of essential LeetCode problems.
- Create and customize personal problem lists.
- Track progress on problem-solving.
- Share and collaborate on curated lists with unique access codes.

## Features

- **User Authentication**: Secure registration, login, and password management.
- **List Management**: Create, update, and delete problem lists.
- **Question Management**: Add, update, and remove questions from lists.
- **Access Control**: Share lists with others and manage permissions.
- **Dynamic Updates**: Add new questions dynamically using provided links.
- **Search Functionality**: Search for lists by keywords or tags.
- **Audit Logging**: Monitor changes and actions through detailed logs.

## Getting Started

### Prerequisites

- **Node.js** (v18+)
- **PostgreSQL**
- **pgAdmin** (optional, for database management)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/kodack-backend.git
   cd kodack-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/kodack
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Database Migrations**

   Apply database migrations using Prisma:

   ```bash
   npx prisma migrate deploy
   ```

5. **Start the Server**

   Launch the server:

   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For inquiries or feedback, please contact us at [support@kodack.com](mailto:support@kodack.com).

---
