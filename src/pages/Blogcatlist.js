import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteCategoryBlog,
  getAllBlogCat,
} from '../app/features/blog/BlogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Blogcatlist = () => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  useEffect(() => {
    dispatch(getAllBlogCat());
  }, []);
  const dispatch = useDispatch();
  const { listBlogCat } = useSelector((state) => state.blog);
  const dataTable = [];
  for (let i = 0; i < listBlogCat?.length; i++) {
    dataTable.push({
      key: i,
      id: listBlogCat[i]._id,
      name: listBlogCat[i].title,
      action: (
        <>
          <Link to={`${listBlogCat[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listBlogCat[i]._id);
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
    dispatch(deleteCategoryBlog(brandId));
    setTimeout(() => {
      dispatch(getAllBlogCat());
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
      <h3 className="mb-4">Blog Category List</h3>
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

export default Blogcatlist;
