import Database from '@tauri-apps/plugin-sql';
import { INSERT_SEED_DB, COUNT_TIMERS } from '@/db/dml/timerDML'
import { CountRow } from '@/types/timerType'


/** Заполняет бд данными (демо таймерами) */
export async function seedDb(db: Database) {

  const count = await db.select<CountRow[]>(COUNT_TIMERS);
  const cnt = count[0]?.cnt ?? 0;
  if (cnt === 0) {
    await db.execute(INSERT_SEED_DB);
  }
}
