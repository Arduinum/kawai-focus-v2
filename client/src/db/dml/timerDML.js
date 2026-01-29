export const SELECT_TIMERS = 'SELECT id, title, pomodoro_time, count_pomodoro FROM timer ORDER BY id DESC'
export const COUNT_TIMERS = 'SELECT COUNT(*) as cnt FROM timer'
export const INSERT_SEED_DB = `
  INSERT INTO timer (title, pomodoro_time, break_time, break_long_time, count_pomodoro) VALUES
  ('Timer mini example', 10, 3, 15, 2), ('Timer max example', 90, 10, 40, 8)
`
