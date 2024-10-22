import { ModalPropType } from "@types"
import { useForm } from "antd/lib/form/Form"
import { useGetBrand } from "../../brand/hooks/queries"
import { useCreateBrandCategory, useUpdateBrandCategory } from "../hooks/mutations"
import { useEffect } from "react"
import { BrandCategoryType } from "../types"
import { Button, Form, Input, Modal, Select } from "antd"

const BrandCategoryModal = ({ open, handleCancel, update }: ModalPropType) => {
    const [form] = useForm()
    const { brands } = useGetBrand({})?.data || {}
    const { mutate: createMutate, isPending: isCreating } = useCreateBrandCategory()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrandCategory()

    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    name: update.name,
                    brand_id: update.brand_id
                })
            } else {
                form.resetFields()
            }
        }
    }, [open, update, form])

    const handleSubmit = (values: BrandCategoryType) => {
        if (update) {
            const payload = { ...values, id: update?.id }
            updateMutate(payload, {
                onSuccess: () => {
                    handleCancel()
                }
            })
        } else {
            createMutate(values, {
                onSuccess: () => {
                    handleCancel();
                }
            });
        }
    }

    return (
        <div>
            <Modal
                open={open}
                title={update?.id ? "Edit category" : "Create category"}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    name="brandForm"
                    style={{ width: "100%", marginTop: "20px" }}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Brand category name"
                        name="name"
                        rules={[{ required: true, message: "Enter brand name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Select Brand"
                        name="brand_id"
                        rules={[{ required: true, message: "Select a brand" }]}
                    >
                        <Select placeholder="Select a brand" size="large">
                            {brands?.map((item: any) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            loading={isCreating || isUpdating}
                        >
                            {update ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}

export default BrandCategoryModal
