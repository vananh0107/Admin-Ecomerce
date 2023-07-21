import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  addCategory,
  getACategory,
  updateCategory,
} from '../app/features/product/productSlice';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../app/features/upload/uploadSlice';

const Addcat = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    title: yup.string().required('Title is required'),
    images: yup.array().required('Images is required'),
  });
  const navigate = useNavigate();
  const location = useLocation();
  let getCatId = location.pathname.split('/')[3];
  let valueSingleCat = useSelector(
    (state) => state.product?.getACategory?.title
  );
  const { images } = useSelector((state) => state.upload);
  if (!getCatId) valueSingleCat = false;
  useEffect(() => {
    formik.values.images = images;
  }, [images]);
  useEffect(() => {
    if (getCatId !== undefined) {
      dispatch(getACategory(getCatId));
    }
  }, [getCatId]);
  const formik = useFormik({
    initialValues: {
      title: '',
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      getCatId
        ? dispatch(updateCategory({ id: getCatId, data: values }))
        : dispatch(addCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/category-list');
      }, 200);
    },
  });
  return (
    <div>
      <h3 className="mb-4">{getCatId ? 'Edit' : 'Add'} Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label={valueSingleCat ? valueSingleCat : 'Enter Brand Title'}
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
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
            {images?.map((item, index) => {
              if (item !== 'null') {
                return (
                  <div key={index} className="position-relative">
                    {item?.url ? (
                      <button
                        onClick={() => {
                          dispatch(
                            deleteImg({
                              id: item.puclicId,
                              data: images,
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
            })}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCatId ? 'Change' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
