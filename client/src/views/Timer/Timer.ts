import { defineComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { IonIcon, IonPage, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';

import {
  stopOutline,
  playOutline,
  pauseOutline
} from 'ionicons/icons';

import { getTimer } from '@/db/crud/timerCrud';
import type { TimerRow } from '@/types/timerType';
import { useCountdown } from '@/composables/useTimer';
import { CountdownReturn } from '@/types/timerType';

/** Возможные состояния таймера */
type TimerState = 'idle' | 'running' | 'paused';

/** Компонент страницы таймера с управлением обратным отсчётом */
export default defineComponent({
  name: 'Timer',
  components: { IonIcon, IonPage, IonContent },

  /** Инициализирует данные и логику компонента таймера */
  setup() {
    const route = useRoute();
    const id = Number(route.params.id);

    /** Реактивные данные загруженного таймера */
    const timer = ref<TimerRow>();

    /** Сообщение об ошибке при загрузке */
    const error = ref<string | null>(null);

    /** Текущее состояние кнопок управления */
    const state = ref<TimerState>('idle');

    /** Обновляет текущее состояние таймера */
    const setState = (newState: TimerState) => {
      state.value = newState;
    };

    /** Shallow-ссылка на экземпляр composable обратного отсчёта */
    const countdown = shallowRef<CountdownReturn | null>(null);

    /** Останавливает таймер при размонтировании компонента */
    onUnmounted(() => {
      countdown.value?.stop();
    });

    /** Загружает данные таймера из БД и инициализирует отсчёт */
    const loadTimer = async (): Promise<void> => {
      try {
        const result = await getTimer(id);
        const timerData = Array.isArray(result) ? result[0] : result;
        timer.value = timerData;

        countdown.value = useCountdown({
          seconds: timerData.pomodoro_time ?? 0,
          onFinish: () => alert('Время вышло!')
        });

      } catch (e) {
        error.value = 'Ошибка загрузки таймера';
        console.error(e);
      }
    };

    onMounted(loadTimer);

    return {
      timer,
      error,
      state,
      setState,
      stopOutline,
      playOutline,
      pauseOutline,
      countdown
    };
  }
});
