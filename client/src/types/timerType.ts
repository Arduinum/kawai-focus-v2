import type { Ref, ComputedRef } from 'vue';

/** Строка списка таймеров с основными полями */
export type TimersRow = {
  id: number;
  title: string;
  pomodoro_time: number;
  count_pomodoro: number;
};

/** Тип для хранения результата COUNT-запроса */
export type CountRow = { cnt: number };

/** Полная строка таймера со всеми временными параметрами */
export type TimerRow = {
  id: number;
  title: string;
  pomodoro_time: number;
  break_time: number;
  break_long_time: number;
  count_pomodoro: number;
}

/** Параметры инициализации обратного отсчёта */
export type CountdownOptions = {
  seconds: number;
  onFinish?: () => void;
}

/** Возвращаемые значения и методы composable обратного отсчёта */
export type CountdownReturn = {
  timeLeft: Ref<number>;
  isRunning: Ref<boolean>;
  formatted: ComputedRef<string>;  // ЧЧ:ММ:СС
  progress: Ref<number>;
  start: () => void;
  stop: () => void;
  pause: () => void;
}
