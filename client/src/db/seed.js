import { INSERT_SEED_DB, COUNT_TIMERS } from './dml/timerDML'


export async function seedDb(db) {
  // Функция для заполнения бд данными

  const count = await db.select(COUNT_TIMERS);
  if (count[0].cnt === 0) {
    await db.execute(INSERT_SEED_DB);
  }
}
