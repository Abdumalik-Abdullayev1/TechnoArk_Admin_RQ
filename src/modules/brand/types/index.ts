export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}

export interface BrandType {
    name: string,
    description: string,
    image: File | null,
    category_id: number | any, 
}