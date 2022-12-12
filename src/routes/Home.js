import { useState } from "react";
import { connect, useSelector } from "react-redux";

// const Home = ({toDos}) => {
const Home = () => {
    const [text,setText] = useState("");

    const toDos = useSelector((state) => state);
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setText("");
    }
    console.log(toDos);
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange}/>
                <button>Add</button>
            </form>
            <ul></ul>
        </>
    )
}

// function mapStateToProps(state,ownProps){
//     return {toDos:state}
// }

// export default connect(mapStateToProps) (Home);
export default Home;