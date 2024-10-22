export interface ProductType{
    name: string,
    price: number,
    category_id: number,
    brand_id: number,
    brand_category_id: number,
    file?: FormData,
    id?: string | number
}

export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}