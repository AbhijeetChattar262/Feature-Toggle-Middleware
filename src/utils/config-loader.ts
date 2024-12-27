import * as fs from 'fs';
import * as path from 'path';
import fetch, { HeadersInit } from 'node-fetch';
import { AppConfig, ConfigResponse, ModuleConfig, RemoteConfigOptions, LocalConfigOptions } from '../types';

export function isUrl(source: string): boolean {
  try {
    new URL(source);
    return true;
  } catch (_) {
    return false;
  }
}

function isModuleConfig(obj: any): obj is ModuleConfig {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.values(obj).every(module => 
    typeof module === 'object' &&
    module !== null &&
    'enabled' in module &&
    'features' in module &&
    typeof module.enabled === 'boolean' &&
    typeof module.features === 'object'
  );
}

function normalizeConfig(data: unknown): AppConfig {
  const config = data as ConfigResponse;
  
  // Handle records format
  if (config.record?.modules && isModuleConfig(config.record.modules)) {
    return { modules: config.record.modules };
  }

  // Handle direct modules object
  if (config.modules && isModuleConfig(config.modules)) {
    return { modules: config.modules };
  }

  // Handle nested data property
  if (config.data) {
    if ('modules' in config.data && config.data.modules && isModuleConfig(config.data.modules)) {
      return { modules: config.data.modules };
    }
    if (isModuleConfig(config.data)) {
      return { modules: config.data };
    }
  }

  throw new Error('Invalid configuration format');
}

export function loadConfigFromFile(configFilePath: string): AppConfig {
  const absolutePath = path.resolve(configFilePath);
  const configFile = fs.readFileSync(absolutePath, 'utf-8');
  const rawConfig = JSON.parse(configFile);
  return normalizeConfig(rawConfig);
}

export async function loadConfigFromUrl(configUrl: string, headers?: HeadersInit): Promise<AppConfig> {
  const response = await fetch(configUrl, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch config from ${configUrl}`);
  }
  const data = await response.json();
  return normalizeConfig(data);
}

export async function loadConfig(options: RemoteConfigOptions | LocalConfigOptions): Promise<AppConfig> {
    if ('url' in options) {
        return await loadConfigFromUrl(options.url, options.headers);
    }
    return { modules: options.modules };
}
