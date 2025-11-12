# API Request/Response Examples

## 1. Check Team Name Availability

### Request
```http
GET /api/check/team?teamName=TechTitans
```

### Success Response (200 OK)
```json
{
  "success": true,
  "available": true,
  "message": "Team name is available"
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "errors": [
    {
      "message": "Team name is required"
    }
  ]
}
```

---

## 2. Check Member Email

### Request
```http
GET /api/check/member?email=john.doe@akgec.ac.in
```

### Success Response (200 OK)
```json
{
  "success": true,
  "available": true,
  "message": "Email is available"
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "errors": [
    {
      "message": "Email is required"
    }
  ]
}
```

---

## 3. Register Team

### Request
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
    },
    {
      "fullName": "Priya Patel",
      "personalEmail": "priya.patel@outlook.com",
      "collegeEmail": "priya.patel@akgec.ac.in",
      "gender": "Female",
      "branch": "IT",
      "residenceAddress": {
        "street": "456 University Road",
        "city": "Ghaziabad",
        "state": "Uttar Pradesh",
        "pincode": "201010",
        "country": "India"
      },
      "studentNumber": "AKG2023002",
      "unstopId": "priya_akg",
      "hackerRankUrl": "https://www.hackerrank.com/profile/priya_patel"
    }
  ]
}
```

### Success Response (201 Created)
```json
{
  "success": true,
  "data": {
    "teamName": "TechTitans",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439011",
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
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "Priya Patel",
        "personalEmail": "priya.patel@outlook.com",
        "collegeEmail": "priya.patel@akgec.ac.in",
        "gender": "Female",
        "branch": "IT",
        "residenceAddress": {
          "street": "456 University Road",
          "city": "Ghaziabad",
          "state": "Uttar Pradesh",
          "pincode": "201010",
          "country": "India"
        },
        "studentNumber": "AKG2023002",
        "unstopId": "priya_akg",
        "hackerRankUrl": "https://www.hackerrank.com/profile/priya_patel"
      }
    ],
    "createdAt": "2025-11-12T17:52:00.000Z",
    "_id": "507f1f77bcf86cd799439010"
  }
}
```

### Error Response (422 Unprocessable Entity)
```json
{
  "success": false,
  "errors": [
    {
      "message": "Team name is required"
    },
    {
      "message": "College Email must be from @akgec.ac.in domain"
    },
    {
      "message": "Invalid HackerRank Profile URL"
    }
  ]
}
```

### Error Response (409 Conflict)
```json
{
  "success": false,
  "errors": [
    {
      "message": "Team name already exists"
    }
  ]
}
```
