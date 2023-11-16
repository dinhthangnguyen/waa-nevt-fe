import axios from "axios";
import { useEffect } from "react";

const Signup = () => {
    const client = axios.create({baseURL: "http://localhost:8080/cars"});

    useEffect(()=> {

    },[])

    

    const submitLogin = (e) => {

    }

    return (<div>
        <h2>Sign Up</h2>
        <form action={submitLogin}>
            <input type="text" required placeholder="Email" />
            <input type="password" required placeholder="password" />
        </form>
    </div>);
}

export default Signup;