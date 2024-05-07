import React, { useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Modal } from 'antd';
import axios from 'axios';
import moment from 'moment'

const { TextArea } = Input;

const BookForm = ({ onFinish, onCancel, initialData, visible }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form,visible]);


    const handleSubmit = async (values) => {
        try {
            if (initialData) {
                console.log(initialData);
                await axios.put(`/api/books/${initialData._id}`, values);
            } else {
                await axios.post('/api/books', values);
            }
            form.resetFields();
            onFinish();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={initialData ? 'Edit Book' : 'Add Book'}
            open={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Publish Date" name="publishDate" rules={[{ required: true, message: 'Please select the publish date' }]}>
                    {/* <DatePicker /> */}
                    <input
                        type="date"
                    />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
                    <Input type='number' />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BookForm;
