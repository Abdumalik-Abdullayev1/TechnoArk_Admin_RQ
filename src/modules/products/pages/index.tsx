import { Button, Space, Tooltip, Image } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { EditOutlined, ArrowsAltOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteProduct } from "../service";
import { useGetProducts } from "../hooks/queries";
import { ColumnsType } from "@types"
import { ConfirmDelete, GlobalTable, Search } from "@components";
import { PaginationType } from "../types";
import DrawerModal from "./drawer";




const Index = () => {
  const [update, setUpdate] = useState(null)
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState({
    limit: 2,
    page: 1,
    search: ""
  })
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data } = useGetProducts(params)
  const { products, count } = data || {}
  useEffect(() => {
    const params = new URLSearchParams(search)
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 5;
    const search_val = params.get("search_val") || ""
    setParams((prev) => ({
      ...prev,
      search: search_val,
      page: page,
      limit: limit
    }))
  }, [search])

  const editData = (data: any) => {
    setUpdate(data)
    setOpen(true)
  }
  const deleteData = (id: any) => {
    deleteProduct(id)
  }
  const handleTableChange = (pagination: PaginationType) => {
    const { pageSize, current } = pagination;
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current
    }))
    const current_params = new URLSearchParams(search);
    current_params.set("limit", `${pageSize}`);
    current_params.set("page", `${current}`);
    navigate(`?${current_params}`);
  }
  const handleCancel = () => {
    setUpdate(null)
    setOpen(false)
  }
  const handleSearch = (value: string) => {
    setParams((prev) => ({
      ...prev,
      search: value
    }))
  }

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_text: string, _record: any, index: number) => `${(params.page - 1) * params.limit + index + 1}`
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Product image",
      dataIndex: "images",
      key: "images",
      render: (image_url: string) => (
        <Image
          width={50}
          src={image_url}
          alt="Product Image"
          style={{ borderRadius: "5px", objectFit: "cover" }}
        />
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: ColumnsType) => (
        <Space size={"middle"}>
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
              style={{ width: "45px", color: "#d55200", borderColor: "#d55200" }}
            />
          </Tooltip>
          <ConfirmDelete
            title="Delete product?"
            description="Are you sure to delete this product?"
            onConfirm={() => deleteData(record.id)}
          >
            <Tooltip title="Delete">
              <Button style={{ width: "45px", color: "#d55200", borderColor: "#d55200" }}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </ConfirmDelete>
          <Tooltip title="View">
            <Button
              type="default"
              icon={<ArrowsAltOutlined />}
              onClick={() => navigate(`/admin-layout/category/${record.id}`)}
              style={{ width: "45px", color: "#d55200", borderColor: "#d55200" }}
            />
          </Tooltip>
        </Space>
      ),
    }
  ]

  return (
    <div>
      <DrawerModal open={open} update={update} handleCancel={handleCancel} />
      <div className='flex justify-between'>
        <Search placeholder='Search brand...' searchParamKey='search' onSearch={handleSearch} />
        <Button type='primary' className='btn' onClick={() => setOpen(true)}>Add Product</Button>
      </div>
      <GlobalTable
        data={products}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: count,
          showSizeChanger: true,
          pageSizeOption: ['2', '5', '7', '10']
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default Index
