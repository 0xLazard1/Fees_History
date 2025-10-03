export const ApiCall = async (rpc: string, address:string) => {
    const response = await fetch('http://127.0.0.1:8000/post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({rpc, address})
    })

    const data = await response.json()
    return data
}