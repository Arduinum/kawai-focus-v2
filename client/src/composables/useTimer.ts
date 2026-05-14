import { ref, computed } from 'vue';
import { CountdownOptions, CountdownReturn } from '@/types/timerType';
import { stopSound } from '@/composables/useAudio';
import { TypeTimer } from '@/types/timerType';


/** Composable для управления обратным отсчётом времени */
export function useCountdown({ timers, onFinish }: CountdownOptions): CountdownReturn {
  const totalSeconds = ref<number>(0);
  const timerNow = ref<TypeTimer | undefined>(timers.shift());

  if (timerNow.value) {
    totalSeconds.value = timerNow.value.time * 60;
  }

  /** Реактивное оставшееся время в секундах */
  const timeLeft = ref<number>(totalSeconds.value);

  /** Флаг активного состояния таймера */
  const isRunning = ref<boolean>(false);

  let interval: ReturnType<typeof setInterval> | null = null;

  /** Форматирует оставшееся время в строку ЧЧ:ММ:СС или сообщение о прохождении таймера */
  const formatted = computed<string>(() => {
    const hours = Math.floor(timeLeft.value / 3600);
    const mins = Math.floor((timeLeft.value % 3600) / 60);
    const secs = timeLeft.value % 60;

    if (timerNow.value) {
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return "Завершён!";
  });

  /** Вычисляет процент прошедшего времени от общего */
  const progress = computed<number>(() => {
    if (totalSeconds.value === 0) return 0;

    return ((totalSeconds.value - timeLeft.value) / totalSeconds.value) * 100;
  });

  /** Отслеживает завершённость таймера */
  const isFinished = computed<boolean>(() => {
    return !timerNow.value || timeLeft.value <= 0;
  });

  /** Задаёт следующий таймер */
  const setNextTimer = (): void => {
    timerNow.value = timers.shift();

    if (timerNow.value) {
      totalSeconds.value = timerNow.value.time * 60;
      timeLeft.value = totalSeconds.value;
    }
  };

  //** Заканчивает таймер */
  const finish = (): void => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    isRunning.value = false;
    timeLeft.value = 0;

    onFinish?.();
  };

  /** Запускает таймер */
  const start = (): void => {
    if (isRunning.value) return
    isRunning.value = true;

    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        finish();
      }
    }, 1000);
  }

  /** Останавливает таймер и сбрасывает время до следующего таймера */
  const stop = (): void => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    isRunning.value = false;

    stopSound();
    setNextTimer()
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
    isFinished,
    formatted,
    progress,
    timerNow,
    start,
    stop,
    pause
  };
}
