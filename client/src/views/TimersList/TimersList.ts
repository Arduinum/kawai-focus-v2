import { defineComponent, onMounted, ref } from 'vue'
import { IonIcon, IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router';
import {
  timerOutline,
  chevronUp,
  chevronDown,
  playCircleOutline,
  pencilOutline,
  trashOutline,
} from 'ionicons/icons'

import { getTimers } from '@/db/crud/timerCrud'
import type { TimersRow } from '@/types/timerType'

export default defineComponent({
  name: 'TimersList',
  components: { IonIcon, IonPage, IonContent },
  setup() {
    const timers = ref<TimersRow[]>([])
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)
    const expandedId = ref<number | null>(null)

    const router = useRouter();

    const goToTimer = (id: number) => {
      router.push(`/timer/${id}`);
    };

    const loadTimers = async (): Promise<void> => {
      loading.value = true
      error.value = null

      try {
        const result = await getTimers()
        timers.value = result
      } catch (e: unknown) {
        error.value = e instanceof Error ? e.message : 'Ошибка загрузки таймеров'
      } finally {
        loading.value = false
      }
    }

    const toggleExpand = (id: number): void => {
      expandedId.value = expandedId.value === id ? null : id
    }

    onMounted(loadTimers)

    return {
      timers,
      loading,
      error,
      expandedId,

      toggleExpand,

      timerOutline,
      chevronUp,
      chevronDown,
      playCircleOutline,
      pencilOutline,
      trashOutline,
      goToTimer
    }
  },
})
