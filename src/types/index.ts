export interface FeatureConfig {
  [key: string]: boolean;
}

export interface ModuleDefinition {
  enabled: boolean;
  features: FeatureConfig;
}

export interface ModuleConfig {
  [moduleName: string]: ModuleDefinition;
}

export interface AppConfig {
  modules: ModuleConfig;
}

export interface ConfigResponse {
  record?: {
    modules: ModuleConfig;
  };
  modules?: ModuleConfig;
  data?: {
    modules?: ModuleConfig;
  } | ModuleConfig;
}

export class FeatureToggleError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = 'FeatureToggleError';
    }
}

export interface FeatureToggleOptions {
    headers?: Record<string, string>; 
    cacheDuration?: number;
    errorHandler?: (error: FeatureToggleError) => void;
}

export interface RemoteConfigOptions {
    url: string;
    headers?: Record<string, string>;
}

export interface LocalConfigOptions {
    modules: ModuleConfig;
}

export type FeatureToggleInitOptions = RemoteConfigOptions | LocalConfigOptions;


