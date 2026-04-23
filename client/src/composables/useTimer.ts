import { ref, computed } from 'vue';
import { CountdownOptions, CountdownReturn } from '@/types/timerType';

/** Composable для управления обратным отсчётом времени */
export function useCountdown({ seconds, onFinish }: CountdownOptions): CountdownReturn {
  const totalSeconds = seconds * 60;

  /** Реактивное оставшееся время в секундах */
  const timeLeft = ref<number>(totalSeconds);

  /** Флаг активного состояния таймера */
  const isRunning = ref<boolean>(false);

  let interval: ReturnType<typeof setInterval> | null = null;

  /** Форматирует оставшееся время в строку ЧЧ:ММ:СС */
  const formatted = computed<string>(() => {
    const hours = Math.floor(timeLeft.value / 3600);
    const mins = Math.floor((timeLeft.value % 3600) / 60);
    const secs = timeLeft.value % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  });

  /** Вычисляет процент прошедшего времени от общего */
  const progress = computed<number>(() => {
    return ((totalSeconds - timeLeft.value) / totalSeconds) * 100;
  });

  /** Запускает таймер */
  const start = (): void => {
    if (isRunning.value) return
    isRunning.value = true;

    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        stop();
        onFinish?.();
      }
    }, 1000);
  }

  /** Останавливает таймер и сбрасывает время до начального */
  const stop = (): void => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    isRunning.value = false;
    timeLeft.value = totalSeconds;
  }

  /** Приостанавливает таймер без сброса оставшегося времени */
  const pause = (): void => {
    if (!isRunning.value) return
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    isRunning.value = false;
  }

  return {
    timeLeft,
    isRunning,
    formatted,
    progress,
    start,
    stop,
    pause
  };
}
