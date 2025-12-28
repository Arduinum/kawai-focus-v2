from kawai_focus_v2.schemas.timer import NewTimerModel
from kawai_focus_v2.database.cruds import new_timer
from kawai_focus_v2.database.db import get_db_instance
from kawai_focus_v2.database.data import data_timers


def new_temers(data: list[NewTimerModel]) -> None:
    """Заполняет базу данных образцами таймеров"""

    db = get_db_instance()
    for timer in data:
        new_timer(data=timer, db=db)


def start_filling_data() -> None:
    """Функция для заполнения бд данными"""

    new_temers(data=data_timers)
