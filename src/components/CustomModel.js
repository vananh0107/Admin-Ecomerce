import React from 'react';
import { Modal } from 'antd';
const CustomModel = (props) => {
  const { open, hidleModal, performAction, title } = props;
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hidleModal}
      // okText="Ok"
      // cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModel;
