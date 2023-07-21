import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from './productService';
import { toast } from 'react-toastify';
export const getAllProduct = createAsyncThunk(
  'product/get-products',
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllBrand = createAsyncThunk(
  'product/get-brands',
  async (thunkAPI) => {
    try {
      return await productService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteABrand = createAsyncThunk(
  'product/delete-brand',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBrand = createAsyncThunk(
  'product/update-brand',
  async (data, thunkAPI) => {
    try {
      return await productService.changeBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllColor = createAsyncThunk(
  'product/get-colors',
  async (thunkAPI) => {
    try {
      return await productService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllCategory = createAsyncThunk(
  'product/get-categories',
  async (thunkAPI) => {
    try {
      return await productService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addProd = createAsyncThunk(
  'product/add',
  async (data, thunkAPI) => {
    try {
      return await productService.addProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addBrand = createAsyncThunk(
  'product/add-brand',
  async (data, thunkAPI) => {
    try {
      return await productService.createBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addCategory = createAsyncThunk(
  'product/add-cart',
  async (data, thunkAPI) => {
    try {
      return await productService.createCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addColor = createAsyncThunk(
  'product/add-color',
  async (data, thunkAPI) => {
    try {
      return await productService.createColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABrand = createAsyncThunk(
  'brand/get-brand',
  async (id, thunkAPI) => {
    try {
      return await productService.getBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACategory = createAsyncThunk(
  'category/get-category',
  async (id, thunkAPI) => {
    try {
      return await productService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCategory = createAsyncThunk(
  'category/update-category',
  async (data, thunkAPI) => {
    try {
      return await productService.changeCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  'category/delete-category',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAColor = createAsyncThunk(
  'color/get-color',
  async (id, thunkAPI) => {
    try {
      return await productService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateColor = createAsyncThunk(
  'color/update-color',
  async (data, thunkAPI) => {
    try {
      return await productService.changeColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');
export const getProduct = createAsyncThunk(
  'product/get-product',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  'product/update-product',
  async (data, thunkAPI) => {
    try {
      return await productService.updateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteColor = createAsyncThunk(
  'color/delete-color',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  product: [],
  isError: false,
  isSuccess: false,
  message: '',
};
export const productSlice = createSlice({
  name: 'product',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listProduct = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listProduct = null;
      })
      .addCase(getAllBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listBrand = action.payload;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listBrand = null;
      })
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listColor = action.payload;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listColor = null;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listCategory = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listCategory = null;
      })
      .addCase(addProd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.prodAdd = action.payload;
        toast.success('Product added successfully');
      })
      .addCase(addProd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.prodAdd = null;
      })
      .addCase(addBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
        toast.success('Brand added successfully');
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdBrand = null;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
        toast.success('Cart added successfully');
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdCategory = null;
      })
      .addCase(addColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
        toast.success('Cart added successfully');
      })
      .addCase(addColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdColor = null;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
        if (state.isSuccess === true)
          toast.success('Brand update successfully');
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdBrand = null;
        if (state.isError === true) toast.error('Brand update error');
      })
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBrand = action.payload;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getBrand = null;
      })
      .addCase(deleteABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        if (state.isSuccess === true)
          toast.success('Brand delete successfully');
      })
      .addCase(deleteABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deletedBrand = null;
        if (state.isError === true) toast.error('Brand delete error');
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getACategory = action.payload;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getACategory = null;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCategory = action.payload;
        if (state.isSuccess === true) toast.success('Brand update successful');
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateCategory = null;
        if (state.isError === true) toast.error('Brand update error');
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCategory = action.payload;
        if (state.isSuccess === true)
          toast.success('Category delete successful');
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteCategory = null;
        if (state.isError === true) toast.error('Category delete error');
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteColor = action.payload;
        if (state.isSuccess === true)
          toast.success('Category delete successful');
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteColor = null;
        if (state.isError === true) toast.error('Category delete error');
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateColor = action.payload;
        if (state.isSuccess === true) toast.success('Color update successful');
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateColor = null;
        if (state.isError === true) toast.error('Color update error');
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAColor = action.payload;
        if (state.isSuccess === true) toast.success('Color update successful');
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getAColor = null;
        if (state.isError === true) toast.error('Color update error');
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getProduct = null;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateProduct = action.payload;
        if (state.isSuccess === true) toast.success('Update successful');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateProduct = null;
        if (state.isError === true) toast.success('Update error');
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteProduct = null;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
