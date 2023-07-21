import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  addBrand,
  getABrand,
  updateBrand,
} from '../app/features/product/productSlice';
const Addbrand = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    title: yup.string().required('Title is required'),
  });
  const location = useLocation();
  let getBrandId = location.pathname.split('/')[3];
  let valueSingleBrand = useSelector((state) => state.product?.getBrand?.title);
  if (!getBrandId) valueSingleBrand = false;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    }
  }, [getBrandId]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      getBrandId
        ? dispatch(updateBrand({ id: getBrandId, data: values }))
        : dispatch(addBrand(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/brand-list');
      }, 1000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getBrandId ? 'Edit' : 'Add'} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label={valueSingleBrand ? valueSingleBrand : 'Enter Brand Title'}
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBrandId ? 'Change' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
