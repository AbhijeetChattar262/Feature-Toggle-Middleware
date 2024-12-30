import express from 'express';
import { getToggleConfig, isFeatureEnabled } from '../src/index';

const app = express();

// Example 1: Initialize with local JSON file
await getToggleConfig('./example.json');

// Example 2: Initialize with remote config
await getToggleConfig('https://api.example.com/feature-config', {
    headers: {
        'X-API-Key': 'test-key'
    }
});

// Example 3: Initialize with direct config object
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

// Use middleware to protect routes
app.get('/api/feature1', 
    isFeatureEnabled('moduleA', 'feature1'),
    (req, res) => {
        res.json({ message: 'Feature 1 is enabled!' });
    }
);

app.get('/api/feature2', 
    isFeatureEnabled('moduleA', 'feature2'),
    (req, res) => {
        res.json({ message: 'Feature 1 is enabled!' });
    }
);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
