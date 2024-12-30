import { Request, NextFunction, Response } from 'express';
import { FeatureToggleOptions, FeatureToggleInitOptions, AppConfig } from './types/index.js';

declare module 'feature-toggle-middleware-test' {
    export function getToggleConfig(configSource: string | FeatureToggleInitOptions, options?: FeatureToggleOptions): Promise<void>;
    export function isFeatureEnabled(moduleName: string, featureName: string): (req: Request, res: Response, next: NextFunction) => void;
    export class FeatureToggleService {
        static getInstance(): FeatureToggleService;
        initialize(configSource: string, options?: FeatureToggleOptions): Promise<void>;
        setConfig(config: AppConfig): void;
        getConfig(): AppConfig;
    }
    export function loadConfigFromFile(configFilePath: string): AppConfig;
    export function loadConfigFromUrl(configUrl: string, headers?: HeadersInit): Promise<AppConfig>;
    export function isFeatureEnabled(config: AppConfig, moduleName: string, featureName: string): boolean;
}
