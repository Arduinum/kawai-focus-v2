import { IonIcon } from '@ionic/vue';
import {
  timerOutline,
  chevronUp,
  chevronDown,
  playCircleOutline,
  pencilOutline,
  trashOutline
} from 'ionicons/icons';

export default {
  name: 'TimersList',
  components: {
    IonIcon,
  },
  setup() {
    // Возвращаем иконки, чтобы они были доступны в шаблоне
    return {
      timerOutline,
      chevronUp,
      chevronDown,
      playCircleOutline,
      pencilOutline,
      trashOutline,
    };
  },
  data() {
    return {
      timers: [],
      expandedId: null,
      loading: true,
      error: null,
      apiUrl: 'http://127.0.0.1:8090/api/timers'
    };
  },
  mounted() {
    this.fetchTimers();
  },
  methods: {
    async fetchTimers() {
      try {
        this.loading = true;
        this.error = null;

        // Для Tauri invoke (раскомментировать при необходимости)
        // const { invoke } = window.__TAURI__.tauri;
        // this.timers = await invoke('list_timers');

        const response = await fetch(`${this.apiUrl}/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.timers = await response.json();
        this.loading = false;
      } catch (err) {
        this.error = `Ошибка загрузки таймеров: ${err.message}`;
        this.loading = false;
        console.error('Fetch error:', err);
      }
    },
    toggleExpand(timerId) {
      this.expandedId = this.expandedId === timerId ? null : timerId;
    }
  },
};
