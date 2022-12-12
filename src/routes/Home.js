import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToDo } from "../store";

// const Home = ({toDos}) => {
const Home = () => {
    const [text,setText] = useState("");
    const dispatch = useDispatch();
    const toDos = useSelector((state) => state);
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addToDo(text))
        setText("");
    }
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange}/>
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((item,index)=>(
                    <li key={index}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </>
    )
}

// function mapStateToProps(state,ownProps){
//     return {toDos:state}
// }

// export default connect(mapStateToProps) (Home);
export default Home;