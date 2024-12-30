# API Reference

## `getToggleConfig`

Initializes the feature toggle middleware.

### Parameters

- `config`: A string (path to JSON file or URL) or an object containing the configuration.
- `options` (optional): An object containing additional options (e.g., headers for remote config).

### Example

```typescript
import { getToggleConfig } from 'feature-toggle-package';

await getToggleConfig('./example.json');
```

## `isFeatureEnabled`

Middleware to protect routes based on feature toggles.

### Parameters

- `moduleName`: The name of the module.
- `featureName`: The name of the feature.

### Example

```typescript
import { isFeatureEnabled } from 'feature-toggle-package';

app.get('/api/feature1', 
    isFeatureEnabled('moduleA', 'feature1'),
    (req, res) => {
        res.json({ message: 'Feature 1 is enabled!' });
    }
);
```
