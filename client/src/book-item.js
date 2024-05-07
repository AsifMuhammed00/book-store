import React from 'react';
import { Button } from 'antd';
import axios from 'axios';

const BookItem = ({ book, onUpdate, onEdit }) => {
    const handleEdit = () => {
        onEdit(book);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/books/${book._id}`);
            onUpdate();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    

    return (
        <div>
            <Button type="primary" onClick={handleEdit}>Edit</Button>
            <Button style={{background:"red",color:"white",marginLeft:10}} onClick={handleDelete}>Delete</Button>
        </div>
    );
};

export default BookItem;
