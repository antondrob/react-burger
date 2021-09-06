import {useParams} from "react-router-dom";

export default function ProfileOrder(){
    const { id } = useParams();
    return (
        <>
            <h3>ProfileOrder Component</h3>
            <h4>Order #{id}</h4>
            <p>To be done in the next sprint...</p>
        </>
    )
}