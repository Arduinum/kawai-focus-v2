import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import TOML from 'toml';
import { Config } from '@/types/configType';


/**
 * Загрузит или создаст TOML-конфиг
 */
export async function loadConfig(): Promise<Config> {
  let text: string | null = null;
  const configName = 'config.toml';

  // 1. пробуем прочитать пользовательский конфиг
  try {
    text = await readTextFile(configName, {
      baseDir: BaseDirectory.AppConfig
    });
  } catch {
    text = null;
  }

  // 2. если нет — создаст из дефолта
  if (!text) {
    const defaultConfig = await fetch(`/${configName}`)
      .then(r => r.text());

    await writeTextFile(configName, defaultConfig, {
      baseDir: BaseDirectory.AppConfig
    });

    text = defaultConfig;
  }

  // 3. парсим TOML
  return TOML.parse(text) as Config;
}
