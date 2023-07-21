import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getAllBlog } from '../app/features/blog/BlogSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Bloglist = () => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  useEffect(() => {
    dispatch(getAllBlog());
  }, []);
  const dispatch = useDispatch();
  const listBlog = useSelector((state) => state.blog?.listBlog?.getAllBlog);
  const dataTable = [];
  for (let i = 0; i < listBlog?.length; i++) {
    dataTable.push({
      no: i + 1,
      key: i,
      name: listBlog[i]?.title,
      author: listBlog[i]?.author,
      category: listBlog[i]?.category,
      action: (
        <>
          <Link to={`${listBlog[i]?._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listBlog[i]?._id);
            }}
            className="fs-3 text-danger ms-3 bg-transparent border-0 mx-4"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleRemove = (brandId) => {
    setOpen(false);
    dispatch(deleteBlog(brandId));
    setTimeout(() => {
      dispatch(getAllBlog());
    }, 100);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <h3 className="mb-4">Bloglist</h3>
      <div>
        <Table
          columns={columns}
          dataSource={dataTable}
          rowSelection={rowSelection}
        />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleRemove(brandId);
        }}
        title="Are you sure want to delete this brand"
      />
    </div>
  );
};

export default Bloglist;
