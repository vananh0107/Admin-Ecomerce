import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { blogService } from './BlogService';
import { toast } from 'react-toastify';
export const getAllBlog = createAsyncThunk(
  'blog/get-blogs',
  async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllBlogCat = createAsyncThunk(
  'blog/get-blog-cat',
  async (thunkAPI) => {
    try {
      return await blogService.getBlogCat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addCategory = createAsyncThunk(
  'blog/create-blog-cat',
  async (data, thunkAPI) => {
    try {
      return await blogService.createBlogCat(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addBlog = createAsyncThunk(
  'blog/create-blog',
  async (data, thunkAPI) => {
    try {
      return await blogService.createBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCategoryBlog = createAsyncThunk(
  'blog-category/update',
  async (data, thunkAPI) => {
    try {
      return await blogService.chageCategoryBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCategoryBlog = createAsyncThunk(
  'blog-category/delete',
  async (data, thunkAPI) => {
    try {
      return await blogService.deleteCategoryBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACatBlog = createAsyncThunk(
  'blog-category/getSingle',
  async (id, thunkAPI) => {
    try {
      return await blogService.getACategoryBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBlog = createAsyncThunk(
  'blog-update',
  async (data, thunkAPI) => {
    try {
      return await blogService.changeBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBlog = createAsyncThunk(
  'blog-delete',
  async (data, thunkAPI) => {
    try {
      return await blogService.deleteBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABlog = createAsyncThunk(
  'blog-getSingle',
  async (id, thunkAPI) => {
    try {
      return await blogService.getABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');
const initialState = {
  blog: [],
  isError: false,
  isSuccess: false,
  message: '',
};
export const blogSlice = createSlice({
  name: 'blog',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listBlog = action.payload;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listBlog = null;
      })
      .addCase(getAllBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listBlogCat = action.payload;
      })
      .addCase(getAllBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listBlogCat = null;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCat = action.payload;
        toast.success('Category added successfully');
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdBlogCat = null;
      })
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
        toast.success('Brand added successfully');
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdBlog = null;
      })
      .addCase(deleteCategoryBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCategoryBlog = action.payload;
        if (state.isSuccess) toast.success('Delete successfully');
      })
      .addCase(deleteCategoryBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteCategoryBlog = null;
        if (state.isError) toast.error('Delete error');
      })
      .addCase(updateCategoryBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategoryBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCategoryBlog = action.payload;
        if (state.isSuccess) toast.success('Update successfully');
      })
      .addCase(updateCategoryBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateCategoryBlog = null;
        if (state.isError) toast.error('Update error');
      })
      .addCase(getACatBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACatBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getACatBlog = action.payload;
      })
      .addCase(getACatBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getACatBlog = null;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getABlog = action.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getABlog = null;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteBlog = action.payload;
        if (state.isSuccess) toast.success('Delete successfully');
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteBlog = null;
        if (state.isError) toast.error('Delete error');
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateBlog = action.payload;
        if (state.isSuccess) toast.success('Update successfully');
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateBlog = null;
        if (state.isError) toast.error('Update error');
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogSlice.reducer;
