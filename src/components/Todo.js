import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo } from "../store";

const Todo = ({text,id}) => {
    //dispatch 객체 생성
    const dispatch = useDispatch();
    const toDoDelete = () => {

        //deleteTodo 디스패치 호출
        dispatch(deleteTodo({id}));
    }
    return <li>
        <Link to={`/${id}`}>
            {text} 
        </Link>
        <button onClick={toDoDelete}>DEL</button>
    </li>
}

export default Todo;