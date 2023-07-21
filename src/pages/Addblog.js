import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { message, Upload } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import {
  addBlog,
  getABlog,
  getAllBlogCat,
  resetState,
  updateBlog,
} from '../app/features/blog/BlogSlice';
import {
  deleteImg,
  uploadImg,
  resetStateUpload,
} from '../app/features/upload/uploadSlice';
import { Select } from 'antd';
import 'react-quill/dist/quill.snow.css';
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
const Addblog = () => {
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
    description: yup.string().required('Description is required'),
    category: yup.string().required('Category is required'),
    images: yup.array().required('Images is required'),
  });
  const navigate = useNavigate();
  const location = useLocation();
  let getCatBlogId = location.pathname.split('/')[3];
  let valueCatBlog = useSelector((state) => state.blog?.getABlog?.getBlog);
  const { listBlogCat } = useSelector((state) => state.blog);
  let { images } = useSelector((state) => state.upload);
  useEffect(() => {
    dispatch(getAllBlogCat());
  }, []);
  useEffect(() => {
    formik.values.images = images;
  }, [images]);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCatBlogId) {
        if (images.length > 0) {
          if (images[0] === 'null') {
            formik.values.images = [];
          } else {
            formik.values.images = images;
          }
        } else {
          formik.values.images = valueCatBlog?.images;
        }
      }
      getCatBlogId
        ? dispatch(updateBlog({ id: getCatBlogId, data: values }))
        : dispatch(addBlog(values));
      valueCatBlog = false;
      dispatch(resetState());
      dispatch(resetStateUpload());
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/blog-list');
      }, 2000);
    },
  });
  useEffect(() => {
    if (getCatBlogId) {
      formik.values.title = valueCatBlog?.title || '';
      formik.values.description = valueCatBlog?.description || '';
      formik.values.category = valueCatBlog?.category || '';
      formik.values.images = valueCatBlog?.images || '';
    }
  }, [valueCatBlog]);
  useEffect(() => {
    dispatch(resetStateUpload());
    if (getCatBlogId !== undefined) {
      dispatch(getABlog(getCatBlogId));
    }
  }, [getCatBlogId]);
  return (
    <div>
      <h3 className="mb-4">
        {getCatBlogId !== undefined ? 'Edit' : 'Add'} Blog
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter BLog Title"
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title || valueCatBlog?.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description || valueCatBlog?.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <select
            name=""
            id=""
            className="form-control mb-3 py-3"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleChange('category')}
            value={formik.values.category || valueCatBlog?.category}
          >
            <option value="">Select Category</option>
            {listBlogCat?.map((item, index) => {
              return (
                <option value={item.title} key={index}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
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
                ? images
                : valueCatBlog?.images
              )?.map((item, index) => {
                if (item !== 'null') {
                  return (
                    <div key={index} className="position-relative">
                      <button
                        onClick={() => {
                          dispatch(
                            deleteImg({
                              id: item.puclicId,
                              data:
                                images.length > 0
                                  ? images
                                  : valueCatBlog?.images,
                            })
                          );
                        }}
                        className="btn-close position-absolute"
                        style={{ top: '10px', right: '10px' }}
                        type="button"
                      ></button>
                      <img src={item.url} alt="" width={200} height={200} />
                    </div>
                  );
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
            {getCatBlogId !== undefined ? 'Update' : 'Add'} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
