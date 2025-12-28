from fastapi import APIRouter, Depends, status

from kawai_focus_v2.database.cruds import get_timers, get_timer, new_timer, update_timer, del_timer
from kawai_focus_v2.schemas.timer import TimerModel, TimerListModel, NewTimerModel, UpdateTimerModel
from kawai_focus_v2.database.db import get_db_instance, SessionDB


router = APIRouter(prefix='/timers', tags=['timers'])


@router.get('/', response_model=list[TimerListModel], status_code=status.HTTP_200_OK)
def list_timers(db: SessionDB = Depends(get_db_instance)) -> list[TimerListModel]:
    """Ручка для получения списка таймеров"""

    return get_timers(db=db)


@router.get('/{id}', response_model=TimerModel, status_code=status.HTTP_200_OK)
def timer(id: int, db: SessionDB = Depends(get_db_instance)) -> TimerModel:
    """Ручка для получения таймера"""

    return get_timer(timer_id=id, db=db)


@router.post('/new', response_model=TimerModel, status_code=status.HTTP_201_CREATED)
def add_timer(data: NewTimerModel, db: SessionDB = Depends(get_db_instance)) -> TimerModel:
    """Ручка для создания нового таймера"""

    return new_timer(data=data, db=db)


@router.patch('/{id}', response_model=TimerModel, status_code=status.HTTP_200_OK)
def update_data_timer(id: int, data: UpdateTimerModel, db: SessionDB = Depends(get_db_instance)) -> TimerModel:
    """Ручка для обновления таймера"""

    return update_timer(timer_id=id, data=data, db=db)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_timer(id: int, db: SessionDB = Depends(get_db_instance)) -> None:
    """Ручка для удаления таймера"""

    del_timer(timer_id=id, db=db)
