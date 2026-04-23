import { getDb } from "@/db/initDb";
import { SELECT_TIMERS, SELECT_TIMER } from "@/db/dml/timerDML";
import { TimersRow, TimerRow } from "@/types/timerType";


/** Получает список таймеров */
export async function getTimers(): Promise<TimersRow[]> {
  const db = await getDb();
  return await db.select<TimersRow[]>(SELECT_TIMERS);
}

/* Получает таймер по его id **/
export async function getTimer(TimerId: number): Promise<TimerRow> {
  const db = await getDb();
  return await db.select<TimerRow>(SELECT_TIMER, [TimerId]);
}
