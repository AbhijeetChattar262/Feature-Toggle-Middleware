# Feature Toggle Middleware

A flexible feature toggle middleware for Express.js applications with support for complex rollout strategies.

## Installation

```bash
npm install feature-toggle-middleware-test
```

## Initialization Methods

```typescript
// 1. Local JSON file
await getToggleConfig('./config.json');

// 2. Remote configuration
await getToggleConfig('https://api.example.com/config', {
    headers: {
        'X-API-Key': 'your-api-key'
    }
});

// 3. Direct configuration object
await getToggleConfig({
    modules: {
        moduleA: {
            enabled: true,
            features: {
                feature1: true,
                feature2: false
            }
        },
        moduleB: {
            enabled: true,
            features: {
                feature3: true
            }
        }
    }
});
```

### Usage Examples

```typescript
import express from 'express';
import { isFeatureEnabled } from 'feature-toggle-middleware';

const app = express();

// Basic route protection
app.get('/api/feature1', 
    isFeatureEnabled('moduleA', 'feature1'),
    (req, res) => {
        res.json({ message: 'Feature 1 is enabled!' });
    }
);

// Error handling
app.use((err, req, res, next) => {
    if (err.name === 'FeatureToggleError') {
        return res.status(404).json({ error: 'Feature not available' });
    }
    next(err);
});
```

## Options

- `cacheDuration`: Cache duration in milliseconds for remote configs
- `headers`: Custom headers for remote config fetching
- `errorHandler`: Custom error handling function

## Error Handling

The middleware throws `FeatureToggleError` for various scenarios:
- Feature not found
- Module not found
- Invalid configuration
- Remote config fetch failures

## Best Practices

1. Use meaningful module and feature names
2. Include descriptions for better documentation
3. Implement proper error handling
