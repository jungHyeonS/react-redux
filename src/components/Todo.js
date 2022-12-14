import { useDispatch } from "react-redux";
import { deleteTodo } from "../store";

const Todo = ({text,id}) => {
    //dispatch 객체 생성
    const dispatch = useDispatch();
    const toDoDelete = () => {

        //deleteTodo 디스패치 호출
        dispatch(deleteTodo(id));
    }
    return <li>
        {text} <button onClick={toDoDelete}>DEL</button>
    </li>
}

export default Todo;