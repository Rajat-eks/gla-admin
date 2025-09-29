# Agenda API Documentation

This document outlines the backend API structure for managing agenda sessions with speakers.

## Database Schema

### Agenda Sessions Table
```sql
CREATE TABLE agenda_sessions (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    description TEXT,
    event_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);
```

### Session Speakers Junction Table
```sql
CREATE TABLE session_speakers (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    speaker_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES agenda_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (speaker_id) REFERENCES speakers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_session_speaker (session_id, speaker_id)
);
```

## API Endpoints

### Base URL
```
http://localhost:8080/api/v1/agenda
```

### 1. Get All Agenda Sessions
```http
GET /agenda/sessions
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "session-uuid",
      "title": "Opening Keynote",
      "startTime": "2024-01-15T08:00:00Z",
      "endTime": "2024-01-15T09:00:00Z",
      "description": "Welcome and opening remarks",
      "eventId": "event-uuid",
      "speakers": [
        {
          "id": "speaker-uuid",
          "name": "John Doe",
          "designation": "CEO",
          "company": "Tech Corp",
          "country": "USA",
          "avatar": "https://example.com/avatar.jpg",
          "linkedin": "https://linkedin.com/in/johndoe"
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. Get Agenda Sessions for Specific Event
```http
GET /agenda/event/{eventId}
```

**Response:** Same as above but filtered by event.

### 3. Get Complete Event Agenda
```http
GET /agenda/event/{eventId}/complete
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "agenda-uuid",
    "eventId": "event-uuid",
    "eventName": "Global Legal Conference 2024",
    "sessions": [
      // Array of sessions with speakers
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 4. Create New Agenda Session
```http
POST /agenda/sessions
```

**Request Body:**
```json
{
  "title": "Panel Discussion: Future of Legal Tech",
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T11:30:00Z",
  "description": "Experts discuss emerging technologies in legal practice",
  "speakerIds": ["speaker-uuid-1", "speaker-uuid-2"],
  "eventId": "event-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-session-uuid",
    "title": "Panel Discussion: Future of Legal Tech",
    "startTime": "2024-01-15T10:00:00Z",
    "endTime": "2024-01-15T11:30:00Z",
    "description": "Experts discuss emerging technologies in legal practice",
    "eventId": "event-uuid",
    "speakers": [
      // Array of speaker objects
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 5. Update Agenda Session
```http
PUT /agenda/sessions/{sessionId}
```

**Request Body:**
```json
{
  "title": "Updated Panel Discussion",
  "startTime": "2024-01-15T10:30:00Z",
  "endTime": "2024-01-15T12:00:00Z",
  "description": "Updated description",
  "speakerIds": ["speaker-uuid-1", "speaker-uuid-3"]
}
```

**Response:** Same as create response.

### 6. Get Specific Agenda Session
```http
GET /agenda/sessions/{sessionId}
```

**Response:** Single session object with speakers.

### 7. Delete Agenda Session
```http
DELETE /agenda/sessions/{sessionId}
```

**Response:**
```json
{
  "success": true,
  "message": "Agenda session deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "startTime",
      "message": "Start time must be before end time"
    }
  }
}
```

## Common Error Codes

- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `INTERNAL_ERROR`: Server error

## Implementation Notes

1. **Time Zones**: All times should be stored in UTC and converted to local time on the frontend
2. **Speaker Management**: Speakers are managed separately and linked to sessions via junction table
3. **Event Association**: All sessions must be associated with an event
4. **Validation**: 
   - Start time must be before end time
   - Session title is required
   - Speaker IDs must exist in the speakers table
5. **Cascading Deletes**: Deleting a session removes all speaker associations
6. **Sorting**: Sessions should be returned sorted by start time

## Frontend Integration

The frontend service (`src/services/agenda/index.ts`) provides methods to interact with these endpoints:

- `getAllAgendaSessions()`: Fetches all sessions
- `getAgendaSessions(eventId)`: Fetches sessions for specific event
- `createAgendaSession(payload)`: Creates new session
- `updateAgendaSession(payload)`: Updates existing session
- `deleteAgendaSession(id)`: Deletes session
- `getAgendaSessionById(id)`: Fetches specific session
- `getEventAgenda(eventId)`: Fetches complete event agenda

## Sample Data

Here's sample data structure for testing:

```json
{
  "sessions": [
    {
      "title": "Registration & Welcome Coffee",
      "startTime": "2024-01-15T08:00:00Z",
      "endTime": "2024-01-15T09:00:00Z",
      "description": "Registration and networking",
      "speakers": []
    },
    {
      "title": "Opening Keynote: The Future of Legal Practice",
      "startTime": "2024-01-15T09:00:00Z",
      "endTime": "2024-01-15T10:00:00Z",
      "description": "Keynote address on emerging trends",
      "speakers": [
        {
          "name": "Sarah Johnson",
          "designation": "Chief Legal Officer",
          "company": "Global Legal Corp",
          "avatar": "https://example.com/sarah.jpg"
        }
      ]
    },
    {
      "title": "Panel: AI in Legal Services",
      "startTime": "2024-01-15T10:30:00Z",
      "endTime": "2024-01-15T12:00:00Z",
      "description": "Expert panel on AI implementation",
      "speakers": [
        {
          "name": "Michael Chen",
          "designation": "AI Research Director",
          "company": "LegalTech Solutions",
          "avatar": "https://example.com/michael.jpg"
        },
        {
          "name": "Emily Rodriguez",
          "designation": "Partner",
          "company": "Rodriguez & Associates",
          "avatar": "https://example.com/emily.jpg"
        }
      ]
    }
  ]
}
```

