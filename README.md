Certainly! Below is a sample `README.md` file for your Express.js application with Swagger integration:

```markdown
# SWAPI Express API

This Express.js application enhances the SWAPI (Star Wars API) by adding search, sort, and caching features. It also includes Swagger documentation for easy exploration and testing of the API.

## Prerequisites

Before running the application, make sure you have Node.js installed on your machine. If not, you can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Vicky3751/anc.git
   ```

2. Navigate to the project directory:

   ```bash
   cd anc
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Run the Application

```bash
npm run dev
```

The server will start running on [http://localhost:3000](http://localhost:3000).

### Explore Swagger Documentation

Open the Swagger documentation in your browser:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

This documentation provides an interactive interface to explore and test the available API endpoints.

## API Endpoints

### 1. Fetch People Data

- **URL:** [http://localhost:3000/people](http://localhost:3000/people)
- **Description:** Get a list of people from SWAPI.

### 2. Search People

- **URL:** [http://localhost:3000/people/search?q=luke](http://localhost:3000/people/search?q=luke)
- **Description:** Search for people based on the provided query parameter (`q`).

### 3. Sort People

- **URL:** [http://localhost:3000/people/sort?sortBy=name](http://localhost:3000/people/sort?sortBy=name)
- **Description:** Sort people based on a provided query parameter (`sortBy`). In this example, it's sorted by name.

```
