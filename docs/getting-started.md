# Getting Started

## Initialization

You can initialize the feature toggle middleware in three ways:

### 1. Local JSON File

```typescript
import { getToggleConfig } from 'feature-toggle-package';

await getToggleConfig('./example.json');
```

### 2. Remote Config

```typescript
import { getToggleConfig } from 'feature-toggle-package';

await getToggleConfig('https://api.example.com/feature-config', {
    headers: {
        'X-API-Key': 'test-key'
    }
});
```

### 3. Direct Config Object

```typescript
import { getToggleConfig } from 'feature-toggle-package';

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

For more configuration options, refer to the [Configuration](./configuration.md) guide.
