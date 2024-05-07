import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import{ Spin }from"antd";


const BookItem = ({ book, onUpdate, onEdit }) => {

    const [loading,setLoading] = React.useState(false)

    const handleEdit = () => {
        onEdit(book);
    };

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/books/${book._id}`);
            onUpdate();
        } catch (error) {
            console.error('Error deleting book:', error);
            setLoading(false)
        }
    };

    

    return (
        <div>
            <Button type="primary" onClick={handleEdit}>Edit</Button>
            <Button disabled={loading} style={{background:"red",color:"white",marginLeft:10}} onClick={handleDelete}>
                Delete
                {loading && <Spin/>}
                </Button>
        </div>
    );
};

export default BookItem;
