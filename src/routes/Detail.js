import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
    //router dom 파라미터 가져오기
    const {id} = useParams();

    //useSelector 로 스토어에있는 상태 가져오기
    const toDos = useSelector((state) => state.toDos)
    const toDo = toDos.find((item) => item.id === parseInt(id));
    console.log(toDo);
    return (
        <>
            <h1>Detail</h1>
            <p>{toDo.text}</p>
        </>
    );
}

export default Detail