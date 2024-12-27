import { Request, Response, NextFunction } from 'express';
import { FeatureToggleService } from '../services/feature-toggle.service';
import { isFeatureEnabled } from '../utils/feature-checker';
import { FeatureToggleError, FeatureToggleOptions, FeatureToggleInitOptions } from '../types';
import { loadConfig, loadConfigFromFile, loadConfigFromUrl, isUrl } from '../utils/config-loader';

export async function initializeFeatureToggleMiddleware(
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

export function featureToggleMiddleware(moduleName: string, featureName: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const config = FeatureToggleService.getInstance().getConfig();
            if (isFeatureEnabled(config, moduleName, featureName)) {
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
