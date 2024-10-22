export interface BrandCategoryType{
    name: string,
    id?: string| number,
    brand_id?: number | string,
}

export interface BrandCategoryType{
    name: string,
    brand_id?: string | number
}

export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}