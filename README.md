# Team Registration API

A RESTful API for managing team registrations with member validations.

## Table of Contents
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [Testing with Postman](#testing-with-postman)

## API Endpoints

### 1. Check Team Name Availability
- **Endpoint**: `GET /api/check/team`
- **Query Parameters**:
  - `teamName` (required): The team name to check
- **Responses**:
  - `200`: Team name availability status
  - `400`: Missing or invalid team name

### 2. Check Member Email
- **Endpoint**: `GET /api/check/member`
- **Query Parameters**:
  - `email` (required): The email to check
- **Responses**:
  - `200`: Email availability status
  - `400`: Missing or invalid email

### 3. Register Team
- **Endpoint**: `POST /api/register`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**: See example below
- **Responses**:
  - `201`: Team registered successfully
  - `400`: Invalid request data
  - `409`: Team name already exists
  - `422`: Validation errors

## Request/Response Examples

### 1. Check Team Name
```http
GET /api/check/team?teamName=TechTitans
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "available": true,
  "message": "Team name is available"
}
```

### 2. Check Member Email
```http
GET /api/check/member?email=john.doe@akgec.ac.in
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "available": true,
  "message": "Email is available"
}
```

### 3. Register Team
```http
POST /api/register
Content-Type: application/json

{
  "teamName": "TechTitans",
  "members": [
    {
      "fullName": "John Doe",
      "personalEmail": "john.doe@gmail.com",
      "collegeEmail": "john.doe@akgec.ac.in",
      "gender": "Male",
      "branch": "CSE",
      "residenceAddress": {
        "street": "123 College Street",
        "city": "Ghaziabad",
        "state": "Uttar Pradesh",
        "pincode": "201009",
        "country": "India"
      },
      "studentNumber": "AKG2023001",
      "unstopId": "john_akg",
      "hackerRankUrl": "https://www.hackerrank.com/profile/john_doe"
    }
  ]
}
```

**Success Response (201 Created)**
```json
{
  "success": true,
  "data": {
    "teamName": "TechTitans",
    "members": [...],
    "createdAt": "2025-11-12T17:52:00.000Z",
    "_id": "507f1f77bcf86cd799439011"
  }
}
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Start the server:
   ```bash
   node server.js
   ```

## Testing with Postman

1. Import the following collection into Postman:
   ```json
   {
     "info": {
       "name": "Team Registration API",
       "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
     },
     "item": [
       {
         "name": "Check Team Name",
         "request": {
           "method": "GET",
           "header": [],
           "url": {
             "raw": "http://localhost:5000/api/check/team?teamName=TechTitans",
             "protocol": "http",
             "host": ["localhost"],
             "port": "5000",
             "path": ["api", "check", "team"],
             "query": [
               {
                 "key": "teamName",
                 "value": "TechTitans"
               }
             ]
           }
         }
       },
       {
         "name": "Register Team",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\n  \"teamName\": \"TechTitans\",\n  \"members\": [\n    {\n      \"fullName\": \"John Doe\",\n      \"personalEmail\": \"john.doe@gmail.com\",\n      \"collegeEmail\": \"john.doe@akgec.ac.in\",\n      \"gender\": \"Male\",\n      \"branch\": \"CSE\",\n      \"residenceAddress\": {\n        \"street\": \"123 College Street\",\n        \"city\": \"Ghaziabad\",\n        \"state\": \"Uttar Pradesh\",\n        \"pincode\": \"201009\",\n        \"country\": \"India\"\n      },\n      \"studentNumber\": \"AKG2023001\",\n      \"unstopId\": \"john_akg\",\n      \"hackerRankUrl\": \"https://www.hackerrank.com/profile/john_doe\"\n    }\n  ]\n}"
           },
           "url": {
             "raw": "http://localhost:5000/api/register",
             "protocol": "http",
             "host": ["localhost"],
             "port": "5000",
             "path": ["api", "register"]
           }
         }
       }
     ]
   }
   ```

2. Update the environment variables in Postman if needed
3. Start sending requests!

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "errors": [
    {
      "message": "Error description"
    }
  ]
}
```

## Rate Limiting

- 200 requests per 15 minutes per IP address
- Headers are included in the response:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time until reset (UTC epoch seconds)
