import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getAllProduct,
} from '../app/features/product/productSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Productlist = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state) => state.product);
  const dataTable = [];
  for (let i = 0; i < listProduct?.length; i++) {
    dataTable.push({
      key: listProduct[i]._id,
      name: listProduct[i].title,
      price: listProduct[i].price,
      brand: listProduct[i].brand,
      category: listProduct[i].category,
      status: listProduct[i].availablity,
      action: (
        <>
          <Link to={`${listProduct[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listProduct[i]._id);
            }}
            className="fs-3 text-danger ms-3 bg-transparent border-0 mx-4"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
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
    dispatch(deleteProduct(brandId));
    setTimeout(() => {
      dispatch(getAllProduct());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Productlist</h3>
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

export default Productlist;
