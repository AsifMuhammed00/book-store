import React, { useState } from 'react';
import { Layout } from 'antd';
//i ised Antd library for UI
import BookList from './book-lists';
import BookForm from './book-form';

const { Content } = Layout;

function App() {
    const [refresh, setRefresh] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
    };

    const handleCancelEdit = () => {
        setEditingBook(null);
    };

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <h1>Bookstore</h1>
                <BookForm onFinish={handleRefresh} initialData={editingBook} onCancelEdit={handleCancelEdit} />
                <BookList refresh={refresh} onEdit={handleEdit} />
            </Content>
        </Layout>
    );
}

export default App;
