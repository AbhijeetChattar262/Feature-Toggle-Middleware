import { AppConfig, FeatureToggleError, FeatureToggleOptions } from '../types/index.js';
import { loadConfigFromFile, loadConfigFromUrl, isUrl } from '../utils/config-loader.js';

export class FeatureToggleService {
    private static instance: FeatureToggleService;
    private config: AppConfig | null = null;
    private lastFetch: number = 0;
    private cacheDuration: number = 300000; // 5 minutes default

    private constructor() {}

    static getInstance(): FeatureToggleService {
        if (!FeatureToggleService.instance) {
            FeatureToggleService.instance = new FeatureToggleService();
        }
        return FeatureToggleService.instance;
    }

    async initialize(configSource: string, options?: FeatureToggleOptions): Promise<void> {
        try {
            if (options?.cacheDuration) {
                this.cacheDuration = options.cacheDuration;
            }

            if (this.shouldRefreshCache()) {
                this.config = isUrl(configSource)
                    ? await loadConfigFromUrl(configSource, options?.headers)
                    : loadConfigFromFile(configSource);
                this.lastFetch = Date.now();
            }
        } catch (error) {
            const toggleError = new FeatureToggleError(
                'Failed to initialize feature toggle service',
                error
            );
            options?.errorHandler?.(toggleError);
            throw toggleError;
        }
    }

    private shouldRefreshCache(): boolean {
        return !this.config || (Date.now() - this.lastFetch) > this.cacheDuration;
    }

    setConfig(config: AppConfig): void {
        this.config = config;
    }

    getConfig(): AppConfig {
        if (!this.config) {
            throw new FeatureToggleError('FeatureToggleService not initialized');
        }
        return this.config;
    }
}
