/** Получает путь к аудио по id */
export function getSoundPathById(id: string): string {
    const sound = SOUND_LIBRARY.find(s => s.id === id);

    if (!sound) {
        throw new Error("Sound not found");
    }

    return sound.file;
}

const base_path = "/sounds"

const SOUND_LIBRARY = [
    { id: "alarm_beep", file: `${base_path}/alarm-beep.mp3`, name: "Alarm Beep" }
];
