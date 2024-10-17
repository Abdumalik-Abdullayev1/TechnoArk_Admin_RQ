export interface ParamsType {
    search?: string | undefined,
    limit?: number | undefined,
    page?: number | undefined
}
export interface ModalPropType{
    id?: number | string,
    open: boolean,
    update: any,
    handleCancel: ()=>void
}