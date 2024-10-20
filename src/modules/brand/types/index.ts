export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}

export interface BrandType {
    id?: string | number,
    name: string,
    description: string,
    file?: FormData,
    category_id?: string | any, 
}