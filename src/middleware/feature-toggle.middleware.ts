import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { FeatureToggleService } from '../services/feature-toggle.service.js';
import { isFeatureEnabledCheck } from '../utils/feature-checker.js';
import { FeatureToggleError, FeatureToggleOptions, FeatureToggleInitOptions } from '../types/index.js';
import { loadConfig, loadConfigFromFile, loadConfigFromUrl, isUrl } from '../utils/config-loader.js';

export async function getToggleConfig(
    configSource: string | FeatureToggleInitOptions,
    options?: FeatureToggleOptions
): Promise<void> {
    try {
        if (typeof configSource === 'string') {
            const config = isUrl(configSource)
                ? await loadConfigFromUrl(configSource, options?.headers)
                : loadConfigFromFile(configSource);
            FeatureToggleService.getInstance().setConfig(config);
        } else {
            const config = await loadConfig(configSource);
            FeatureToggleService.getInstance().setConfig(config);
        }
    } catch (error) {
        throw new FeatureToggleError('Initialization failed', error);
    }
}

export function isFeatureEnabled(moduleName: string, featureName: string) {
    return (req: Request, res: ExpressResponse, next: NextFunction): void => {
        try {
            const config = FeatureToggleService.getInstance().getConfig();
            if (isFeatureEnabledCheck(config, moduleName, featureName)) {
                next();
                return;
            }
            res.status(403).json({
                error: 'Feature Disabled',
                module: moduleName,
                feature: featureName
            });
        } catch (error) {
            res.status(500).json({
                error: 'Feature Toggle Service Error',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}
