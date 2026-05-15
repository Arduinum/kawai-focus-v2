import { TypeTimer } from '@/types/timerType';
import { getTimer } from '@/db/crud/timerCrud';


/** Фомирует цепочку таймеров */
export async function queueTimer(TimerId: number): Promise<TypeTimer[]> {
  let timers: TypeTimer[] = [];

  const result = await getTimer(TimerId);
  const timerData = Array.isArray(result) ? result[0] : result;

  for (let i = 0; i < timerData.count_pomodoro; i++) {
    timers.push({
      title: timerData.title,
      time: timerData.pomodoro_time,
      typeTimer: "Помидор"
    });

    if (i === timerData.count_pomodoro - 1) {
      timers.push({
        title: timerData.title,
        time: timerData.break_long_time,
        typeTimer: "Перерывище"
      });
    } else {
      timers.push({
        title: timerData.title,
        time: timerData.break_time,
        typeTimer: "Перерыв"
      });
    }
  }

  return timers;
}
