from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from functools import lru_cache

from kawai_focus_v2.core.settings import settings


class SessionDB:
    """Класс для управления подключением к базе данных."""

    def __init__(self) -> None:
        self._engine = create_engine(
            url=settings.db_settings.get_url_db,
            echo=settings.db_settings.echo_db
        )
        self._session_factory = sessionmaker(
            bind=self._engine,
            expire_on_commit=False,
            autocommit=False
        )

    @property
    def get_session(self) -> sessionmaker[Session]:
        """Метод для получения сессии"""

        return self._session_factory


@lru_cache(maxsize=1)
def get_db_instance() -> SessionDB:
    """Возвращает один и тот же объект SeesionDB"""

    return SessionDB()
