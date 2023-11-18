import axios from "axios";
const host = "http://localhost:8080";
const client = axios.create({ baseURL: host });

const useAPI = () => {
    const GetClient = (path, token, headers = { "Content-Type": "Application/json" }) => {
        let config = {
            headers: {
                ...headers,
            }
        }
        if (token) {
            config = {
                headers: {
                    ...headers,
                    Authorization: "Bearer " + token
                }
            } 
        }
        return client.get(path, config);
    }

    const PostClient = (path, data, token, headers = { "Content-Type": "Application/json" }) => {
        let config = {
            headers: {
                ...headers,
            }
        }
        if (token) {
            config = {
                headers: {
                    ...headers,
                    Authorization: "Bearer " + token
                }
            } 
        }
        return client.post(host + path, data, config);
    }

    const PutClient = (path, data, token, headers = { "Content-Type": "Application/json" }) => {
        const config = {
            headers: {
                ...headers,
                Authorization: "Bearer " + token
            }
        }
        return client.put(path, data, config);
    }

    const DeleteClient = (path, data, token, headers = { "Content-Type": "Application/json" }) => {
        let config = {
            headers: {
                ...headers,
            }
        }
        if (token) {
            config = {
                headers: {
                    ...headers,
                    Authorization: "Bearer " + token
                }
            } 
        }
        return client.delete(path, data, config);
    }

    return {PostClient, GetClient, DeleteClient, PutClient}
}

export default useAPI;