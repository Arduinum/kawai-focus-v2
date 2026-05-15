let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;

/** Получить AudioContext */
function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new AudioContext();
    }

    return audioContext;
}

/** Воспроизводит звук */
export async function playSound(url: string): Promise<void> {
    const context = getAudioContext();

    if (context.state === 'suspended') {
        await context.resume();
    }

    // Если уже играет звук — остановит
    stopSound();

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = context.createBufferSource();

    source.buffer = audioBuffer;
    source.connect(context.destination);
    currentSource = source;
    source.start(0);
    source.onended = () => {
        source.disconnect();

        if (currentSource === source) {
            currentSource = null;
        }
    };
}

/** Останавливает звук */
export function stopSound(): void {
    if (currentSource) {
        currentSource.stop();
        currentSource.disconnect();
        currentSource = null;
    }
}
