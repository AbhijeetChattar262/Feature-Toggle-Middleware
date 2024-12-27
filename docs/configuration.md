# Configuration

## JSON File

The JSON file should have the following structure:

```json
{
    "modules": {
        "moduleA": {
            "enabled": true,
            "features": {
                "feature1": true,
                "feature2": false
            }
        },
        "moduleB": {
            "enabled": true,
            "features": {
                "feature3": true
            }
        }
    }
}
```

## Remote Config

The remote config should return a JSON object with the same structure as the local JSON file.

## Direct Config Object

You can pass a direct config object with the same structure as the JSON file.

For more details, refer to the [API Reference](./api-reference.md).
