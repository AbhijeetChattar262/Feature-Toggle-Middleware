# Getting Started

## Initialization

You can initialize the feature toggle middleware in three ways:

### 1. Local JSON File

```typescript
import { initializeFeatureToggleMiddleware } from 'feature-toggle-package';

await initializeFeatureToggleMiddleware('./example.json');
```

### 2. Remote Config

```typescript
import { initializeFeatureToggleMiddleware } from 'feature-toggle-package';

await initializeFeatureToggleMiddleware('https://api.example.com/feature-config', {
    headers: {
        'X-API-Key': 'test-key'
    }
});
```

### 3. Direct Config Object

```typescript
import { initializeFeatureToggleMiddleware } from 'feature-toggle-package';

await initializeFeatureToggleMiddleware({
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

For more configuration options, refer to the [Configuration](./configuration.md) guide.
