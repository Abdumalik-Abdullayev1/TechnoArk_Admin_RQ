import { Button, Space, Tooltip } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ConfirmDelete, GlobalTable, Search } from "@components"
import { deleteBrandCategory } from "../service";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnsType } from "@types";
import BrandCategoryModal from "./modal";
import { PaginationType } from "../types";
import { useGetBrandCategory } from "../hooks/queries";


const Index = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const [update, setUpdate] = useState(null)
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    search: ""
  })
  const { data } = useGetBrandCategory(params)
  const { brandCategories, count } = data || {}
  useEffect(() => {
    const params = new URLSearchParams(search)
    const page = Number(params.get("page")) || 1
    const limit = Number(params.get("limit")) || 5
    const search_val = params.get("search_val") || ""
    setParams((prev) => ({
      ...prev,
      search: search_val,
      limit: limit,
      page: page
    }))
  }, [search])

  const deleteData = (id: any) => {
    deleteBrandCategory(id)
  }
  const editData = (data: any) => {
    setUpdate(data)
    setOpen(true)
  }
  const handleCancel = () => {
    setUpdate(null)
    setOpen(false)
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
  const handleSearch = (value: string) =>{
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
      render: (_text: string, _record: any, index: number) => `${(params.page - 1) * params.limit + index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
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
            title="Delete category?"
            description="Are you sure to delete this category?"
            onConfirm={() => deleteData(record.id)}
          >
            <Tooltip title="Delete">
              <Button style={{ width: "45px", color: "#d55200", borderColor: "#d55200" }}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </ConfirmDelete>
        </Space>
      ),
    }
  ]

  return (
    <div>
      <BrandCategoryModal open={open} update={update} handleCancel={handleCancel} />
      <div className='flex justify-between'>
        <Search placeholder='Search brand...' searchParamKey='search' onSearch={handleSearch} />
        <Button type='primary' className='btn' onClick={() => setOpen(true)}>Add Brand</Button>
      </div>
      <GlobalTable
        data={brandCategories}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: count,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '7', '10']
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default Index