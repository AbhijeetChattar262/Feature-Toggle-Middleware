import { AppConfig } from '../types/index.js';

export function isFeatureEnabledCheck(config: AppConfig, moduleName: string, featureName: string): boolean {
  const module = config.modules[moduleName];
  if (!module?.enabled) {
    console.log(`Module ${moduleName} is disabled or not found`);
    return false;
  }
  
  const featureEnabled = Boolean(module.features[featureName] ?? false);
  console.log(`Feature ${featureName} enabled: ${featureEnabled}`);
  return featureEnabled;
}
