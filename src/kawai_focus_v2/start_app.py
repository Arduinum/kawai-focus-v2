from kawai_focus_v2.core.settings import settings

import uvicorn


def run():
    uvicorn.run(
        'kawai_focus_v2.main:app',
        host=settings.app_settings.host_app,
        port=settings.app_settings.port_app,
        reload=settings.app_settings.is_reload
    )
