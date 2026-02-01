// Definition av IError-gränssnittet för felhantering.
export interface IError {
    title?: string,
    description?: string,
    status?: string
}