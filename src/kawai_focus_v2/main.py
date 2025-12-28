from fastapi import FastAPI
from kawai_focus_v2.api.timers.router import router as timers_router


app = FastAPI(title='Kawai-Focus')
app.include_router(timers_router, prefix='/api')
