import { jwtDecode } from "jwt-decode";


export function getPayload () {
    const token = localStorage.getItem('authToken');
    const payload = jwtDecode(token!)
    console.log(payload)

    return payload
}

export function isAuthorized(scope: string){
    const payload = getPayload() as { scopes: string []} // pego de dentro da função o array de scopes

    return payload.scopes.some((s) => s === scope); // percorre o array e me da um true ou false dependendo do parametro passado
}