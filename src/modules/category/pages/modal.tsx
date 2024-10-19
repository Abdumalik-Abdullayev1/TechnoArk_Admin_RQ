import { useForm } from "antd/lib/form/Form";
import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { ModalPropType } from "@types";
import { CategoryType } from "../types";
import { useCreateCategory, useUpdateCategory } from "../hooks/mutation";

const PageModal = ({ open, handleCancel, update }: ModalPropType) => {
    const [form] = useForm()
    const { mutate: createMutate, isPending: isCreateing } = useCreateCategory()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory()
    useEffect(() => {
        if(open){
            if(update){
                form.setFieldsValue({
                    name: update.name,
                })
            }else{
                form.resetFields()
            }
        }
    }, [open, update, form])
    const handleSubmit = (values: CategoryType) => {
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
                    name="categoryForm"
                    style={{ width: "100%", marginTop: "20px" }}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Category name"
                        name="name"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            loading={isCreateing || isUpdating}
                        >
                            {update ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default PageModal