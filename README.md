# Feature Toggle Middleware

A simple and flexible feature toggle middleware for Express.js applications.

## Installation

```bash
npm install feature-toggle-middleware
```

## Quick Start

```typescript
import express from 'express';
import { initializeFeatureToggleMiddleware, featureToggleMiddleware } from '../index';

const app = express();

// Initialize feature toggles with JSON file
await initializeFeatureToggleMiddleware('./config.json');

// Or initialize with remote config
await initializeFeatureToggleMiddleware('https://api.example.com/feature-config', {
    "X-API-Key": "your-api-key"
});

// Use middleware to protect routes
app.get('/api/feature1', 
    featureToggleMiddleware('moduleA', 'feature1'),
    (req, res) => {
        res.json({ message: 'Feature 1 is enabled!' });
    }
);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

```

## Configuration Format

```json
{
  "modules": {
    "moduleA": {
      "enabled": true,
      "features": {
        "feature1": true,
        "feature2": false
      }
    }
  }
}
```
