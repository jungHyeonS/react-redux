import {combineReducers} from "redux"
import { configureStore ,getDefaultMiddleware,createAction,createReducer} from "@reduxjs/toolkit";


//redux-prsit
import {persistReducer} from "redux-persist"
//로컬 스토리지로 저장
import storage from "redux-persist/lib/storage"



export const addToDo = createAction("ADD")
export const deleteTodo = createAction("DELETE");

//새로운 상태를 리턴할수도 있고, 기존 상태를 수정할수도있다
//redux 내부적으로는 새로운 상태를 리턴해주고 있다
const toDos = createReducer([],{
    //redux toolkit 에서는 state 를 변경할수있다
    [addToDo] : (state,action) => {
        state.push({
            text:action.payload.text,
            id:action.payload.id    
        })
    },
    [deleteTodo] : (state,action) => {
        return state.filter(toDo => toDo.id !== action.payload.id)
    }
        
})

//리듀서는 하나로 묶는다
export const rootReducer = combineReducers({
    toDos
})


//root 키로 로컬스토리지에 저장
const persistConfig = {
    key: "root",
    storage: storage,
}

//persist 리듀서 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

//더 나은 개발 경험을 위해 store 설정에 몇몇 기보값을 추가한다
const store = configureStore({
    reducer: persistedReducer,

    //redux state,action 에 직렬화가 불가능한 값은 전달할수없다
    //그래서 아래와 같이 미들웨어를 추가했다
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;