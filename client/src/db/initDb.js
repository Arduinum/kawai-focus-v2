import Database from '@tauri-apps/plugin-sql';
import { CREATE_TIMER } from './ddl/timerDDL';
import { getDB_URL } from '../config';
import { seedDb } from './seed';

let dbPromise = null;

export async function getDb() {
  // Функция для получения подключения к базе данных

  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        const dbUrl = await getDB_URL();
        const db = await Database.load(dbUrl);
        await db.execute(CREATE_TIMER);
        await seedDb(db);
        return db;
      } catch (error) {
        console.error('Ошибка инициализации базы данных', error);
        throw error;
      }
    })();
  }
  return await dbPromise;  // await для консистентности
}
