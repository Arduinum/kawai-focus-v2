export const CREATE_TIMER = `
  PRAGMA foreign_keys=ON;
  CREATE TABLE IF NOT EXISTS timer (
    title VARCHAR(200) NOT NULL,
    pomodoro_time INTEGER NOT NULL,
    break_time INTEGER NOT NULL,
    break_long_time INTEGER NOT NULL,
    count_pomodoro INTEGER NOT NULL,
    id INTEGER NOT NULL,
    PRIMARY KEY (id)
  );`
