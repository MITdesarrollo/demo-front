import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CategoryDreamon,
  CreateShoppingCart,
  GetFilters,
  RemovePackageShoppingCart,
  UpsertPackageShoopingCart,
} from './counterApi';

const initialState = {
  user: {
    login: false,
    info: null,
    aplicationUserId: null,
    reciver: null,
    email: null
  },
  categories: [],
  setPackets: [],
  filters: [],
  shoppingCart: {
    aplicationUserId: null,
    id: '',
    packages: [],
    packSelect: [],
    shoppingCartPackages: [],
    priceTotal: 0,
    leadId: null,
    dreamOns: null,
    draft: null,
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const categoryDreamon = createAsyncThunk(
    'dreamon/category',
    async (value) => {
      const response = await CategoryDreamon(value);
      return response;
    }
);

// Create a new ShoppingCart and Update ShoppingCart
export const shoppingCart = createAsyncThunk(
    'dreamon/shoopingCart',
    async ({ uuid, packageId, quantity, isNew = true }) => {
      try {
        const newCartResponse = await CreateShoppingCart(uuid);
        const upsertResponse = await UpsertPackageShoopingCart(
            newCartResponse.id,
            packageId,
            quantity
        );
        return upsertResponse;
      } catch (error) {
        console.error('Error shoppingCart: ', error);
      }
    }
);

// Remove Package from ShoopingCart
export const removePackage = createAsyncThunk(
    'dreamon/RemovePackage',
    async ({ uuid, packageId }) => {
      try {
        const removeFromCart = await RemovePackageShoppingCart(uuid, packageId);
        return removeFromCart;
      } catch (error) {
        console.error('Error removePackage: ', error);
      }
    }
);

// Get Filters
export const getFilters = createAsyncThunk('dreamon/GetFilters', async () => {
  try {
    return await GetFilters();
  } catch (error) {
    console.error('Error getFilters: ', error);
  }
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFilterPackets: (state, action) => {
      console.log('Setting filter packets: ', action.payload);
      state.setPackets = action.payload;
    },
    setUserLogin: (state, action) => {
      console.log('Setting user login: ', action.payload);
      state.user.login = action.payload;
    },
    setUserInfo: (state, action) => {
      console.log('Setting user info: ', action.payload);
      state.user.info = action.payload;
    },
    setUserEmail: (state, action) => {
      console.log('Setting user email: ', action.payload);
      state.user.email = action.payload;
    },
    updateUserInfo: (state, action) => {
      console.log('Updating user info: ', action.payload);
      const newUserInfo = action.payload;
      state.user.info = {
        ...state.user.info,
        FirstName: newUserInfo.FirstName,
        LastName: newUserInfo.LastName,
        MobilePhone: newUserInfo.MobilePhone,
        Country: newUserInfo.Country,
        StateOrProvince: newUserInfo.StateOrProvince,
        DateOfBirth: newUserInfo.DateOfBirth,
        Gender: newUserInfo.Gender,
        email: newUserInfo.email,
      };
    },
    setAplicationUserId: (state, action) => {
      console.log('Setting application user ID: ', action.payload);
      state.user.aplicationUserId = action.payload;
    },
    resetShoppingCart: (state) => {
      console.log('Resetting shopping cart');
      state.shoppingCart = {
        ...state.shoppingCart,
        aplicationUserId: null,
        id: '',
        packages: [],
        shoppingCartPackages: [],
        priceTotal: 0,
        leadId: null,
        dreamOns: null,
        draft: null,
      };
    },
    finishShoppingCartCheckout: (state) => {
      console.log('Finishing shopping cart checkout, resetting shopping cart');
      state.shoppingCart = {
        ...state.shoppingCart,
        aplicationUserId: null,
        id: '',
        packages: [],
        shoppingCartPackages: [],
        priceTotal: 0,
        leadId: null,
        dreamOns: null,
        draft: null,
      };
    },
    setShoppingCartByUser: (state, action) => {
      console.log('Setting shopping cart by user: ', action.payload);
      state.shoppingCart = {
        aplicationUserId: action.payload.aplicationUserId,
        id: action.payload.id,
        packages: action.payload.packages,
        shoppingCartPackages: action.payload.shoppingCartPackages,
      };
    },
    setPackageSelect: (state, action) => {
      console.log('Setting package select: ', action.payload);
      state.shoppingCart = {
        ...state.shoppingCart,
        packSelect: action.payload,
      };
    },
    updatePackageSelect: (state, action) => {
      const { index, value } = action.payload;
      console.log(`Updating package select at index ${index} with value: `, value);
      state.shoppingCart.packSelect[index] = value;
    },
    setLeadId: (state, action) => {
      console.log('Setting leadId: ', action.payload);
      state.shoppingCart.leadId = action.payload;
    },
    setDreamOns: (state, action) => {
      console.log('Setting dreamOns: ', action.payload);
      state.shoppingCart.dreamOns = action.payload;
    },
    setDreamOnDeliveryType: (state, action) => {
      const { id, deliveryType } = action.payload;
      console.log(`Setting dreamOn delivery type for id ${id} to: `, deliveryType);
      const dreamOn = state.shoppingCart.dreamOns.find(dreamOn => dreamOn.id === id);
      if (dreamOn) {
        dreamOn.deliveryType = deliveryType;
      }
    },
    setReciverDreamon: (state, action) => {
      console.log('Setting receiver dreamon:', action.payload);
      state.user.reciver = action.payload;
    },
    setDreamonDraft: (state, action) => {
      console.log('Setting dreamon draft: ', action.payload);
      state.shoppingCart.draft = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryDreamon.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder
        .addCase(getFilters.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getFilters.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.filters = action.payload;
        })
        .addCase(getFilters.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    builder
        .addCase(shoppingCart.pending, (state) => {
          console.log('ShoppingCart action pending');
          state.isLoading = true;
        })
        .addCase(shoppingCart.fulfilled, (state, action) => {
          console.log('ShoppingCart fulfilled: ', action.payload);
          state.isLoading = false;
          state.isSuccess = true;
          state.shoppingCart.aplicationUserId = action.payload.aplicationUserId;
          state.shoppingCart.id = action.payload.id;
          state.shoppingCart.packages = action.payload.packages;
          state.shoppingCart.shoppingCartPackages = action.payload.shoppingCartPackages;
        })
        .addCase(shoppingCart.rejected, (state, action) => {
          console.error('ShoppingCart rejected: ', action.payload);
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    builder
        .addCase(removePackage.pending, (state) => {
          console.log('RemovePackage action pending');
          state.isLoading = true;
        })
        .addCase(removePackage.fulfilled, (state, action) => {
          console.log('RemovePackage fulfilled, updating shopping cart: ', action.payload);
          state.isLoading = false;
          state.isSuccess = true;
          state.shoppingCart.aplicationUserId = action.payload?.aplicationUserId;
          state.shoppingCart.id = action.payload.id;
          state.shoppingCart.packages = action.payload.packages;
          state.shoppingCart.shoppingCartPackages = action.payload.shoppingCartPackages;
        })
        .addCase(removePackage.rejected, (state, action) => {
          console.error('RemovePackage rejected: ', action.payload);
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
  },
});

export const {
  setFilterPackets,
  setUserLogin,
  setUserInfo,
  setAplicationUserId,
  resetShoppingCart,
  setShoppingCartByUser,
  setLeadId,
  setDreamOns,
  setReciverDreamon,
  setDreamonDraft,
  finishShoppingCartCheckout,
  updateUserInfo,
  setPackageSelect,
  updatePackageSelect,
  setUserEmail,
  setDreamOnDeliveryType
} = counterSlice.actions;

export default counterSlice.reducer;
