import { useForm } from "antd/lib/form/Form";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { ModalPropType } from "@types";
import { Upload } from "@components";
import { BrandType } from "../types";
import { useGetCategory } from "../../category/hooks/queries";
import { useCreateBrand, useUpdateBrand } from "../hooks/mutations";

const { TextArea } = Input;
const { Option } = Select;

const PageModal = ({ open, handleCancel, update }: ModalPropType) => {
  const [file, setFile] = useState<any>(null)
  const [form] = useForm();
  const { categories } = useGetCategory({})?.data || {}
  const { mutate: createMutate, isPending: isCreating } = useCreateBrand();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrand();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
          description: update.description,
          category_id: update.category_id,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, update, form]);

  const handleSubmit = async (values: BrandType) => {
    const selectedFile = file?.originFileObj || file
    if (!selectedFile) {
      form.setFields([
        {
          name: "file",
          errors: ["Upload File"]
        }
      ])
      return;
    }
    const formData = new FormData();
    formData.append("name", values.name),
      formData.append("description", values.description)
    if (values.category_id) {
      formData.append("category_id", values.category_id)
    }
    formData.append("file", selectedFile)
    if (update) {
      const payload = { ...values, id: update.id, categoryId: values.category_id };
      updateMutate(payload, {
        onSuccess: () => {
          handleCancel();
        },
      });
    } else {
      createMutate(formData, {
        onSuccess: () => {
          handleCancel();
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      title={update?.id ? "Edit Brand" : "Create Brand"}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="brandForm"
        style={{ width: "100%", marginTop: "20px" }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Brand Name"
          name="name"
          rules={[{ required: true, message: "Enter brand name" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true, message: "Select a category" }]}
        >
          <Select placeholder="Select a category" size="large">
            {categories?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {
          !update && <Form.Item
            label="Brand logo"
            name="file"
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
        }

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <TextArea rows={4} />
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
  );
};

export default PageModal;
