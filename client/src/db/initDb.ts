import Database from '@tauri-apps/plugin-sql';
import { CREATE_TIMER } from '@/db/ddl/timerDDL';
import { getDB_URL } from '@/config';
import { seedDb } from '@/db/seed';

let dbPromise: Promise<Database> | null = null;

/** Получает подключение к бд */
export async function getDb(): Promise<Database> {
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
  return await dbPromise;
}
