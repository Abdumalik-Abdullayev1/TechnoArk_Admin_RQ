export interface CategoryType {
    name: string
    id?: any | number
}
export interface ColumnsType extends CategoryType {
    image?: string;
    createdAt: string;
    lastUpdateAt: string;
}
export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}
