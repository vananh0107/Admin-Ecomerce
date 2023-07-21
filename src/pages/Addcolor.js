import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  addColor,
  getAColor,
  updateColor,
} from '../app/features/product/productSlice';

const Addcolor = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    title: yup.string().required('Color is required'),
  });
  const navigate = useNavigate();
  const location = useLocation();
  let getColorId = location.pathname.split('/')[3];
  let valueSingleColor = useSelector(
    (state) => state.product?.getAColor?.title
  );
  if (!getColorId) valueSingleColor = false;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    }
  }, [getColorId]);
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      getColorId
        ? dispatch(updateColor({ id: getColorId, data: values }))
        : dispatch(addColor(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/color-list');
      }, 200);
    },
  });
  return (
    <div>
      <h3 className="mb-4">{getColorId ? 'Edit' : 'Add'} Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label={valueSingleColor ? valueSingleColor : 'Enter Color Title'}
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
            {getColorId ? 'Change' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
