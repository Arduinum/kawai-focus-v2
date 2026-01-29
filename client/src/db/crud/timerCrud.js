import { getDb } from "../initDb";
import { SELECT_TIMERS } from "../dml/timerDML";


export async function getTimers() {
  // Функция для получения списка таймеров

  const db = await getDb();
  return await db.select(SELECT_TIMERS);
}
