from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from kawai_focus_v2.api.timers.router import router as timers_router
from kawai_focus_v2.core.settings import settings

app = FastAPI(title='Kawai-Focus')

# Настройка CORS
origins = settings.app_settings.frontend_origins.split(',')

app.add_middleware(
    CORSMiddleware,  # type: ignore[arg-type]
    allow_origins=origins,  # Разрешаем запросы с этих адресов
    allow_credentials=True,
    allow_methods=['*'],  # Разрешаем все методы (GET, POST, etc.)
    allow_headers=['*'],  # Разрешаем все заголовки
)

app.include_router(timers_router, prefix='/api')
