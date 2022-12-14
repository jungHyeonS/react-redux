import {combineReducers} from "redux"
import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";

//redux-prsit
import {persistReducer} from "redux-persist"
//로컬 스토리지로 저장
import storage from "redux-persist/lib/storage"


const ADD = "ADD";
const DELETE = "DELETE";

export const addToDo = (text) => {
    return {
        type : ADD,
        text,
        id:Date.now()
    }
}

export const deleteTodo = (id) => {
    return{
        type:DELETE,
        id
    }
}

const toDos = (state = [],action) => {
    switch(action.type){
        case ADD:
            return [{text:action.text,id:action.id},...state]
        case DELETE:
            return state.filter(toDo => toDo.id !== action.id)
        default:
            return state
    }
}

//리듀서는 하나로 묶는다
export const rootReducer = combineReducers({
    toDos
})


//root 키로 로컬스토리지에 저자 
const persistConfig = {
    key: "root",
    storage: storage,
}

//persist 리듀서 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,

    //redux state,action 에 직렬화가 불가능한 값은 전달할수없다
    //그래서 아래와 같이 미들웨어를 추가했다
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;