import { IonIcon } from '@ionic/vue';
import {
  timerOutline,
  chevronUp,
  chevronDown,
  playCircleOutline,
  pencilOutline,
  trashOutline
} from 'ionicons/icons';

import { ref, onMounted } from 'vue';
import { getTimers } from '../../db/crud/timerCrud';

export default {
  name: 'TimersList',
  components: {
    IonIcon,
  },
  setup() {
    const timers = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const expandedId = ref(null);

    const loadTimers = async () => {
      loading.value = true;
      error.value = null;

      try {
        const result = await getTimers();
        timers.value = result;
      } catch (err) {
        error.value = err.message || 'Ошибка загрузки таймеров';
      } finally {
        loading.value = false;
      }
    };

    const toggleExpand = (id) => {
      expandedId.value = expandedId.value === id ? null : id;
    };

    onMounted(() => {
      loadTimers();
    });

    return {
      // состояние
      timers,
      loading,
      error,
      expandedId,

      // методы
      toggleExpand,

      // иконки
      timerOutline,
      chevronUp,
      chevronDown,
      playCircleOutline,
      pencilOutline,
      trashOutline,
    };
  },
};
