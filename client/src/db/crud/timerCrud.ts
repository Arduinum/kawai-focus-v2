import { getDb } from "@/db/initDb";
import { SELECT_TIMERS } from "@/db/dml/timerDML";
import { TimersRow } from "@/types/timerType"


/** Получает список таймеров */
export async function getTimers(): Promise<TimersRow[]> {
  const db = await getDb();
  return await db.select<TimersRow[]>(SELECT_TIMERS);
}
