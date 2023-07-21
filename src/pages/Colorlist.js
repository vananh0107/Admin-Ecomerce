import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteColor, getAllColor } from '../app/features/product/productSlice';
import CustomModel from '../components/CustomModel';
const Colorlist = () => {
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
    dispatch(getAllColor());
  }, []);
  const dispatch = useDispatch();
  const { listColor } = useSelector((state) => state.product);
  const dataTable = [];
  for (let i = 0; i < listColor?.length; i++) {
    dataTable.push({
      id: i + 1,
      key: i,
      name: listColor[i].title,
      action: (
        <>
          <Link to={`${listColor[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listColor[i]._id);
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
  const [colorId, setColorId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleRemove = (colorId) => {
    setOpen(false);
    dispatch(deleteColor(colorId));
    setTimeout(() => {
      dispatch(getAllColor());
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
      <h3 className="mb-4">Colorlist</h3>
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
          handleRemove(colorId);
        }}
        title="Are you sure want to delete this brand"
      />
    </div>
  );
};

export default Colorlist;
