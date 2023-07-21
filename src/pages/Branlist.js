import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteABrand,
  getAllBrand,
} from '../app/features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Brandlist = () => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  useEffect(() => {
    dispatch(getAllBrand());
  }, []);
  const dispatch = useDispatch();
  const { listBrand } = useSelector((state) => state.product);
  const dataTable = [];
  for (let i = 0; i < listBrand?.length; i++) {
    dataTable.push({
      no: i + 1,
      key: i,
      id: listBrand[i]._id,
      name: listBrand[i].title,
      action: (
        <>
          <Link to={`${listBrand[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listBrand[i]._id);
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
    dispatch(deleteABrand(brandId));
    setTimeout(() => {
      dispatch(getAllBrand());
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
      <h3 className="mb-4">Brandlist</h3>
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

export default Brandlist;
