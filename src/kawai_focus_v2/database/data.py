from kawai_focus_v2.schemas.timer import NewTimerModel


data_timers = [
    NewTimerModel(
        title='Timer mini example',
        pomodoro_time=10,
        break_time=3,
        break_long_time=15,
        count_pomodoro=2
    ),
    NewTimerModel(
        title='Timer max example',
        pomodoro_time=90,
        break_time=10,
        break_long_time=40,
        count_pomodoro=8
    ),
]
