import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { message, Tag } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import {
  addProd,
  getAllBrand,
  getAllCategory,
  getAllColor,
  getProduct,
  resetState,
  updateProduct,
} from '../app/features/product/productSlice';
import {
  deleteImg,
  resetStateUpload,
  uploadImg,
} from '../app/features/upload/uploadSlice';
import { Select } from 'antd';
const Addproduct = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const dispatch = useDispatch();
  const schema = yup.object({
    title: yup.string().required('Title is required'),
    price: yup.number().required('Price is required'),
    description: yup.string().required('Description is required'),
    category: yup.string().required('Category is required'),
    brand: yup.string().required('Brand is required'),
    tags: yup.string().required('tag is required'),
    color: yup
      .array()
      .min(1, 'Pick at least one color')
      .required('Color is required'),
    quantity: yup.number().required('Quantity is required'),
    images: yup.array().required('Images is required'),
  });
  const navigate = useNavigate();
  const location = useLocation();
  let getProductId = location.pathname.split('/')[3];
  let valueProduct = useSelector((state) => state.product?.getProduct);
  const { listBrand } = useSelector((state) => state.product);
  const { listCategory } = useSelector((state) => state.product);
  const { listColor } = useSelector((state) => state.product);
  const { images } = useSelector((state) => state.upload);
  const colorState = [];
  listColor?.forEach((element) => {
    colorState.push({
      value: element?._id,
      label: element?.title,
    });
  });
  const [color, setColor] = useState([]);
  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllCategory());
    dispatch(getAllColor());
  }, []);
  useEffect(() => {
    formik.values.images = images;
    formik.values.color = color;
  }, [images, color]);
  const handleColor = (e) => {
    setColor(e);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      brand: '',
      price: undefined,
      description: '',
      category: '',
      color: '',
      quantity: undefined,
      images: '',
      tags: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const arrayImage = valueProduct?.images.concat(images);
      if (getProductId) {
        if (images.length > 0) {
          if (images[0] === 'null') {
            formik.values.images = [];
          } else {
            formik.values.images = images;
          }
        } else {
          formik.values.images = valueProduct?.images;
        }
      }
      getProductId
        ? dispatch(updateProduct({ id: getProductId, data: values }))
        : dispatch(addProd(values));
      setTimeout(() => {
        valueProduct = false;
        dispatch(resetState());
        dispatch(resetStateUpload());
        formik.resetForm();
        setColor([]);
        navigate('/admin/product-list');
      }, 1000);
    },
  });
  useEffect(() => {
    if (getProductId) {
      formik.values.title = valueProduct?.title || '';
      formik.values.price = valueProduct?.price || '';
      formik.values.description = valueProduct?.description || '';
      formik.values.category = valueProduct?.category || '';
      formik.values.brand = valueProduct?.brand || '';
      formik.values.tags = valueProduct?.tags || '';
      formik.values.color = valueProduct?.color || '';
      formik.values.quantity = valueProduct?.quantity || '';
      formik.values.images = valueProduct?.images || '';
      setColor(valueProduct?.color);
    } else {
      document.getElementsByTagName('form')[0].reset();
      setColor([]);
      formik.values = undefined;
    }
  }, [valueProduct]);
  useEffect(() => {
    dispatch(resetStateUpload());
    formik.resetForm();
    document.getElementsByTagName('form')[0].reset();
    dispatch(getAllBrand());
    dispatch(getAllCategory());
    dispatch(getAllColor());
    dispatch(resetState());
    formik.values = undefined;
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId));
      setColor(valueProduct?.color);
    }
  }, [getProductId]);
  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={label}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <div>
      <h3 className="mb-4">
        {getProductId !== undefined ? 'Edit' : 'Add'} Product
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title || valueProduct?.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description || valueProduct?.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange('price')}
            onBl={formik.handleBlur('price')}
            val={formik.values.price || valueProduct?.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onCh={formik.handleChange('quantity')}
            onBl={formik.handleBlur('quantity')}
            val={formik.values.quantity || valueProduct?.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <select
            name=""
            id=""
            className="form-control mb-3 py-3"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleChange('category')}
            value={formik.values.category || valueProduct?.category}
          >
            <option value="">Select Category</option>
            {listCategory?.map((item, index) => {
              if (valueProduct?.category === item.title) {
                return (
                  <option value={item.title} key={index} defaultValue>
                    {item.title}
                  </option>
                );
              } else {
                return (
                  <option value={item.title} key={index}>
                    {item.title}
                  </option>
                );
              }
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            id=""
            className="form-control mb-3 py-3"
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleChange('tags')}
            value={formik.values.tags || valueProduct?.tags}
          >
            <option value="" disabled>
              Select Tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100 mb-3"
            placeholder="Select color"
            tagRender={tagRender}
            defaultValue={color}
            onChange={(i) => handleColor(i)}
            options={colorState}
          >
            {/* {colorState.map((op) => {
              return (
                <Select.Option
                  key={op.value}
                  value={op.value}
                  label={op.label}
                  selected={checkColor(op.value)}
                >
                  {op.label}
                </Select.Option>
              );
            })} */}
          </Select>
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <select
            name=""
            id=""
            className="form-control mb-3 py-3"
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleChange('brand')}
            value={formik.values.brand || valueProduct?.brand}
          >
            <option value="">Select Brand</option>
            {listBrand?.map((item, index) => {
              return (
                <option value={item.title} key={index}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uploadImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages mt-3 d-flex flex-wrap gap-3">
            {images ? (
              (images.length > 0 || images[0] === 'null'
                ? images.concat(valueProduct?.images)
                : valueProduct?.images
              )?.map((item, index) => {
                if (item !== 'null') {
                  return (
                    <div key={index} className="position-relative">
                      {item?.url ? (
                        <button
                          onClick={() => {
                            dispatch(
                              deleteImg({
                                id: item.puclicId,
                                data:
                                  images.length > 0
                                    ? images
                                    : valueProduct?.images,
                              })
                            );
                          }}
                          className="btn-close position-absolute"
                          style={{ top: '10px', right: '10px' }}
                          type="button"
                        ></button>
                      ) : (
                        <></>
                      )}
                      {item?.url ? (
                        <img src={item?.url} alt="" width={200} height={200} />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })
            ) : (
              <></>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getProductId !== undefined ? 'Update' : 'Add'} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
