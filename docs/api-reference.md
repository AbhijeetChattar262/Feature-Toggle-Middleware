# API Reference

## `initializeFeatureToggleMiddleware`

Initializes the feature toggle middleware.

### Parameters

- `config`: A string (path to JSON file or URL) or an object containing the configuration.
- `options` (optional): An object containing additional options (e.g., headers for remote config).

### Example

```typescript
import { initializeFeatureToggleMiddleware } from 'feature-toggle-package';

await initializeFeatureToggleMiddleware('./example.json');
```

## `featureToggleMiddleware`

Middleware to protect routes based on feature toggles.

### Parameters

- `moduleName`: The name of the module.
- `featureName`: The name of the feature.

### Example

```typescript
import { featureToggleMiddleware } from 'feature-toggle-package';

app.get('/api/feature1', 
    featureToggleMiddleware('moduleA', 'feature1'),
    (req, res) => {
        res.json({ message: 'Feature 1 is enabled!' });
    }
);
```