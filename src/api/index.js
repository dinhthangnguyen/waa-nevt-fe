import axios from "axios";
export const host = "http://localhost:8080";
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

    const DeleteClient = (path, token, headers = { "Content-Type": "Application/json" }) => {
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
            console.log(config);
        }
        console.log(token)
        return client.delete(path, config);
    }

    return {PostClient, GetClient, DeleteClient, PutClient}
}

export default useAPI;