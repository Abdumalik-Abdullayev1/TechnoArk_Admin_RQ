import {
    ProductOutlined,
    AppstoreOutlined,
    AppstoreAddOutlined,
    SettingOutlined,
    StockOutlined,
} from '@ant-design/icons';

const admin = [
    {
        content: "Products",
        path: "/admin-layout",
        icon: <ProductOutlined/>
    },
    {
        content: "Categories",
        path: "/admin-layout/category",
        icon: <AppstoreOutlined/>
    },
    {
        content: "Brands",
        path: "/admin-layout/brand",
        icon: <AppstoreOutlined/>
    },
    {
        content: "Brand category",
        path: "/admin-layout/brand-category",
        icon: <AppstoreAddOutlined/>
    },
    {
        content: "Ads",
        path: "/admin-layout/ads",
        icon: <AppstoreAddOutlined/>
    },
    {
        content: "Stock",
        path: "/admin-layout/stock",
        icon: <StockOutlined/>
    },
    {
        content: "Settings",
        path: "/admin-layout/settings",
        icon: <SettingOutlined/>
    },
]

export { admin }