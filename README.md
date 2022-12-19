# React Redux Study
Document : https://www.notion.so/React-Redux-c91a31ac3bc545518fb12b6e8985ee7e<br/>


### Provider
React Redux에는 Provider 컴포넌트를 통해 다른 컴포넌트에서 Redux Store를 사용할수있습니다
```
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```


### connect()
connect은 여전히 작동하며 React-redux 8.x에서 지원됩니다. 그러나 hooks api를 사용하는게 좋습니다

### useSelector()
selector함수를 사용하여 Redux store state의 데이터를 가져올수있습니다
```
const toDos = useSelector((state) => state);
```

### useDispatch
이 훅은 Redux store에서 dispatch함수에 대한 참조를 반환합니다
```
const dispatch = useDispatch();
dispatch(addToDo(text))
```

## React TOOLKIT
Redux는 잘설계된 라이브러리 이지만 다음과 같은 문제점이 있습니다<br>
1. 리덕스의 복잡한 스토어 설정<br>
2. 리덕스를 유용하게 사용하기 위해서 추가되어야 하는 많은 패키지들<br>
3. 리덕스를 사용을 위해 요구되는 다량의 보일러플레이트 코드들<br>
이러한 문제점을 개선하기 위해 Redux Toolkit이 만들어지게 되었습니다

### createAction
기존 Action creator를 세부적으로 만들필요 없이 actionCreator를 통해서 type,payload형태의 Action를 만들어줍니다
```
export const addToDo = createAction("ADD")
export const deleteTodo = createAction("DELETE");
```

### createReduceer
리듀서 함수 생성을 단순화 하는 유틸리티 입니다. 내부적으로 Immer를 사용합니다
```
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
```

### configureStore
createStore 함수보다 더 나은 개발 경험을 제공합니다
```
const store = configureStore({})
```

### createSlice
초기 상태, 리듀서,액션등을 자동으로 생성합니다

## Redux Persist
리덕스에 저장된 store는 페이지를 새로고침 할경우 데이터가 날라가게 됩니다.<br>
이러한 이슈를 대응하기 위해 로컬스토리지 혹은 세션스토리지에 저장하고자 하는 리듀서에 상태를<br>
저장하여 새로고침을 해도 저장소에 저장된 데이터를 redux로 불러올수 있게 해줍니다

### 설치
```
npm install redux-persist
```

### Reducer에 persist store 정의
1. persistReducer와 storage 가져오기
```
//redux-prsit
import {persistReducer} from "redux-persist"
//로컬 스토리지로 저장
import storage from "redux-persist/lib/storage"

//세션 스토리로 하고싶다면 아래와 같이
import storageSession from "redux-persist/lib/storage/session"
```

2. persistConfig 생성
```
//root 키로 로컬스토리지에 저장
const persistConfig = {
    key: "root",
		//로컬스토리지에 저장
    storage: storage,
		//만약 특정 리듀서만 허용한다면 whiteList 추가
		whitelist : ["toDos"]
		//특정 리듀서를 제외할려면 blacklist
}
```

3. persistReducer생성<br>
persistConfig와 만들어둔 리듀서를 사용하여 persistReducer를 만듭니다
```
const persistedReducer = persistReducer(persistConfig, rootReducer);
```

4. configureStore에 persistReducer 지정
```
const store = configureStore({
    reducer: persistedReducer,

    //redux state,action 에 직렬화가 불가능한 값은 전달할수없다
    //그래서 아래와 같이 미들웨어를 추가했다
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});
```
5. index.js 에서 persist store 사용
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));

//psesist 스토어 생성
const persistor = persistStore(store)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
```
