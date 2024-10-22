import { useForm } from "antd/lib/form/Form"
import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select } from 'antd';
import { Upload } from "@components";
import { ModalPropType } from "@types"
import { useGetCategory } from "../../category/hooks/queries";
import { useBrandById, useBrandCategoryById } from "../hooks/queries";
import { useCreateProduct } from "../hooks/mutations";

const DrawerModal = ({ open, update, handleCancel }: ModalPropType) => {
    const [form] = useForm()
    const [categoryId, setCategoryId] = useState<number | undefined>()
    const [brandId, setBrandId] = useState<number | undefined>()
    const [file, setFile] = useState<any>(null)
    const { categories } = useGetCategory({})?.data || {}
    const { brands } = useBrandById(categoryId || 0).data || {}
    const { brandCategories } = useBrandCategoryById(brandId || 0).data || {};
    const { mutate: createMutate } = useCreateProduct()
    const changeCategory = (id: number | undefined) => {
        setCategoryId(id)
    }
    const changeBrand = (id: number | undefined) => {
        setBrandId(id)
    }

    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    name: update.name,
                    price: update.price,
                    category_id: update.category_id,
                    brand_id: update.brand_id,
                    brand_category_id: update.brand_category_id,
                })
            } else {
                form.resetFields()
            }
        }
    }, [open, update, form])

    const handleSubmit = (values: any) => {
        const selectedFile = file?.originFileObj || file;
        if (!selectedFile) {
            form.setFields([
                {
                    name: "file",
                    errors: ["Please upload a file"],
                },
            ]);
            return;
        }
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category_id", values.category_id);
        formData.append("brand_id", values.brand_id);
        formData.append("brand_category_id", values.brand_category_id);
        formData.append("files", selectedFile);
        console.log(formData.entries(), 'formData')
        createMutate(formData, {
            onSuccess: () => {
                handleCancel();
            },
        });
    }

    return (
        <>
            <Drawer
                title="Create a new product"
                width={720}
                onClose={handleCancel}
                open={open}

                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Please enter product name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please enter product price' }]}
                            >
                                <Input
                                    placeholder="Please enter product price"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category_id"
                                label="Category"
                                rules={[{ required: true, message: 'Please select category' }]}
                            >
                                <Select onSelect={changeCategory} placeholder="Please select an owner">
                                    {categories?.map((item: any) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="brand_id"
                                label="Brand"
                                rules={[{ required: true, message: 'Please choose the brand' }]}
                            >
                                <Select disabled={brands?.length == 0} onSelect={changeBrand} placeholder="Please choose the brand">
                                    {brands?.map((item: any) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="brand_category_id"
                                label="Brand Category"
                                rules={[{ required: true, message: 'Please choose brand category' }]}
                            >
                                <Select disabled={brandCategories?.length == 0} placeholder="Please choose brand category">
                                    {brandCategories?.map((item: any) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="files"
                                label="Product image"
                                rules={[
                                    {
                                        required: true,
                                        validator: () =>
                                            file
                                                ? Promise.resolve()
                                                : Promise.reject("Please upload a file"),
                                    },
                                ]}
                            >
                                <Upload setFile={setFile} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            className="btn"
                        // loading={isCreating || isUpdating}
                        >
                            {/* {update ? "Update" : "Add"} */}
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

        </>
    )
}

export default DrawerModal
