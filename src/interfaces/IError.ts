// Definition av IError-gränssnittet för felhantering.
export interface IError {
    title?: string,
    description?: string,
    status?: string,
    server_empty?: string,
    server_create?: string,
    server_update?: string,
    server_delete?: string
}