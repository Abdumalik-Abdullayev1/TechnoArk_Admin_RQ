export interface ParamsType {
    search?: string | undefined,
    limit?: number | undefined,
    page?: number | undefined,
    categories?: any
}
export interface ModalPropType{
    id?: number | string,
    open: boolean,
    update: any,
    handleCancel: ()=>void
}

export interface ColumnsType {
    name: string;
    category_id?: string | number;
    file?: string;
    createdAt: string;
    lastUpdateAt: string;
}