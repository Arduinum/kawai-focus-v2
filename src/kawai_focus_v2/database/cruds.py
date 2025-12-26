from sqlalchemy import select

from kawai_focus_v2.database.models import Timer
from kawai_focus_v2.schemas.timer import TimerModel, TimerListModel
from kawai_focus_v2.database.db import get_db_instance, SessionDB


def get_timer(timer_id: int) -> TimerModel:
    """Функция для получения данных таймера"""

    db = get_db_instance()
    with db.get_session() as session:
        timer = session.get(Timer, timer_id)
        return TimerModel.model_validate(timer, from_attributes=True)


def list_timers() -> list[TimerListModel]:
    """Функция для получения списка таймеров"""

    db = get_db_instance()
    with db.get_session() as session:
        timers = session.execute(
            select(Timer.id, Timer.title, Timer.pomodoro_time, Timer.count_pomodoro)
        ).all()

        return [TimerListModel.model_validate(timer, from_attributes=True) for timer in timers]


def new_timer(data: TimerModel, db: SessionDB) -> TimerModel:
    """Функция для создания нового таймера"""

    with db.get_session() as session:
        timer = Timer(**data.model_dump())
        session.add(timer)
        session.commit()
        session.refresh(timer)

        return TimerModel.model_validate(timer, from_attributes=True)


def update_timer(data: TimerModel, db: SessionDB) -> TimerModel:
    """Функция для обновления таймера"""

    with db.get_session() as session:
        timer = session.get(Timer, data.id)

        for field, value in data.model_dump(exclude={'id'}).items():
            setattr(timer, field, value)

        session.commit()
        session.refresh(timer)

        return TimerModel.model_validate(timer, from_attributes=True)


def del_timer(timer_id: int, db: SessionDB) -> None:
    """Функция для удаления таймера"""

    with db.get_session() as session:
        timer = session.get(Timer, timer_id)
        session.delete(timer)
        session.commit()
