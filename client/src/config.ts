import { appLocalDataDir } from '@tauri-apps/api/path';

/** Возвращает URL подключения к SQLite */
export async function getDB_URL(): Promise<string> {

  const appDir = await appLocalDataDir();
  return `sqlite:${appDir}/timer.db`;
}
