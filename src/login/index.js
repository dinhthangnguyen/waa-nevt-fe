import axios from "axios";
import { useEffect } from "react";

const Login = () => {
    const client = axios.create({baseURL: "http://localhost:8080/cars", headers: {
        "Content-Type": "Application/json"
    }});

    useEffect(()=> {

    },[])

    

    const submitLogin = (e) => {

    }

    return (<div>
        <h2>Log In</h2>
        <form action={submitLogin}>
            <input type="text" required placeholder="Email" />
            <input type="password" required placeholder="password" />
            <button type="submit">LogIn</button>
        </form>
    </div>);
}

export default Login;