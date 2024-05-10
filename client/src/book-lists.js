import React, { useEffect, useState } from 'react';
import { Input, Table, Button } from 'antd';
import axios from 'axios';
import BookItem from './book-item';
import BookForm from './book-form';
import moment from 'moment';

const { Search } = Input;

const BookList = ({ refresh, onEdit }) => {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('/api/books', {
                params: {
                    page,
                    search: searchText
                }
            });
            console.log();
            setBooks(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    console.log(books);
    useEffect(() => {
        fetchBooks();
    }, [page, searchText, refresh]);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleUpdate = () => {
        fetchBooks();
    };

    const handleAddNew = () => {
        setEditingBook(null);
        setShowModal(true);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Publish Date',
            dataIndex: 'publishDate',
            key: 'publishDate',
            render: (_, record) => (
                <span>{moment(record.publishDate).format("MMM Do YY")}</span>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <BookItem book={record} onUpdate={handleUpdate} onEdit={() => handleEdit(record)} />
            )
        }
    ];

    return (
        <div>
            <Button type="primary" onClick={handleAddNew} style={{marginBottom:30}}>Add New</Button>
            <Search placeholder="Search books" onSearch={handleSearch} enterButton />
            <Table
                dataSource={books.books}
                columns={columns}
                pagination={{ current: page, onChange: handlePageChange , total:books.totalCount}}
                rowKey="_id"
            />
            <BookForm
                visible={showModal}
                onCancel={handleCancel}
                onFinish={() => { handleUpdate(); setShowModal(false); }}
                initialData={editingBook}
            />
        </div>
    );
};

export default BookList;
