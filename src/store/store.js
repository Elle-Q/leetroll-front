import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import alertReducer from "../components/alert/ops/alertSlice";
import authReducer from "../api/authSlice";
import confirmReducer from "../components/alert/confirm/confirmSlice";
import refreshReducer from "./refresh-slice";
import playerReducer from "../views/app/play/playSlice";
import loadingReducer from "../components/loading/loading-slice";
import itemReducer from "../views/app/item/item-slice";
import cartReducer from "./cart-slice";
import searchReducer from "./search";
import orderReducer from "./order-slice";

export default configureStore({
    reducer: {
        itemModal: itemReducer,
        alert: alertReducer,
        auth:authReducer,
        confirm: confirmReducer,
        refresh:refreshReducer,
        player:playerReducer,
        loadingModel:loadingReducer,
        cart:cartReducer,
        search: searchReducer,
        order: orderReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})