import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  addCategory,
  getACatBlog,
  updateCategoryBlog,
} from '../app/features/blog/BlogSlice';
const Addblogcat = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    title: yup.string().required('Title is required'),
  });
  const location = useLocation();
  let getCatBlogId = location.pathname.split('/')[3];
  let valueCatBlog = useSelector((state) => state.blog?.getACatBlog?.title);
  if (!getCatBlogId) valueCatBlog = false;
  useEffect(() => {
    if (getCatBlogId !== undefined) {
      dispatch(getACatBlog(getCatBlogId));
    }
  }, [getCatBlogId]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      getCatBlogId
        ? dispatch(updateCategoryBlog({ id: getCatBlogId, data: values }))
        : dispatch(addCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/blog-category-list');
      }, 1000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label={valueCatBlog ? valueCatBlog : 'Enter Blog Category Title'}
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
            {getCatBlogId ? 'Change' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
