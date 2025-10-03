import hypersync
import asyncio
from web3 import Web3
import json
from datetime import datetime
from constant import RPC

token = "add-your-token"


def Choose_RPC(rpc_selection: str):
    return RPC.get(rpc_selection)


def to_int(hexstr: str):
    return Web3.to_int(hexstr=hexstr)


async def GetQuery(rpc: str, address: list):
    try:
        client = hypersync.HypersyncClient(
            hypersync.ClientConfig(Choose_RPC(rpc), token)
        )
        getblock = await client.get_height()
        query = hypersync.Query(
            from_block=0,
            to_block=getblock,
            transactions=[hypersync.TransactionSelection(from_=[address])],
            field_selection=hypersync.FieldSelection(
                block=[
                    hypersync.BlockField.TIMESTAMP,
                    hypersync.BlockField.NUMBER,
                ],
                transaction=[
                    hypersync.TransactionField.HASH,
                    hypersync.TransactionField.VALUE,
                    hypersync.TransactionField.GAS_USED,
                    hypersync.TransactionField.EFFECTIVE_GAS_PRICE,
                ],
            ),
        )

        stream = await client.stream(query=query, config=hypersync.StreamConfig())
        all_info = []
        while True:
            response = await stream.recv()

            if response is None:
                break

            for tx, bloc in zip(response.data.transactions, response.data.blocks):
                test = {
                    "hash": tx.hash,
                    "value": to_int(tx.value) / 10**18,
                    "time": datetime.fromtimestamp(to_int(bloc.timestamp)).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                    "number": bloc.number,
                    "fees": to_int(tx.gas_used)
                    * to_int(tx.effective_gas_price)
                    / 10**18,
                }
                all_info.append(test)

            if response.next_block:
                query.from_block = response.next_block

        with open("alltx.json", "w") as f:
            json.dump(all_info, f, indent=2)

    except Exception as e:
        raise Exception(f"Erreur lors de la récupération des transactions: {str(e)}")


# asyncio.run(GetQuery("eth", "add_address""))
