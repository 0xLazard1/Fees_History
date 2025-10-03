from fastapi import FastAPI
from main import GetQuery
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class QueryParams(BaseModel):
    rpc: str
    address: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_stat():
    path = "alltx.json"
    df = pd.read_json(path)
    df["time"] = pd.to_datetime(df["time"])
    return {
        "nombre_tx": len(df),
        "value": df["value"].sum(),
        "time": df["time"].max() - df["time"].min(),
        "fees": df["fees"].sum(),
    }


@app.get("/")
def read_root():
    return {"Hello : World"}


@app.post("/post")
async def get_tx(params: QueryParams):
    json = await GetQuery(params.rpc, params.address)
    info = get_stat()

    return info
