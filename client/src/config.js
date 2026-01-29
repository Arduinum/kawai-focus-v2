import { appLocalDataDir } from '@tauri-apps/api/path';

export async function getDB_URL() {
  // Функция верёнт путь до бд

  const appDir = await appLocalDataDir();
  return `sqlite:${appDir}/timer.db`;
}
