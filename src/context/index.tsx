import { createContext, useState } from "react";
import axios from "axios"

interface User {
    data: {
        id:string,
        email:string
    } | null
    error : string | null
    loading : boolean
}

//we need to define some default state
const UserContext = createContext<
    [User,React.Dispatch<React.SetStateAction<User>>]
>([
    {
        data: null,
        error: null,
        loading: true 
    },
    () => {}
])

const UserProvider = ({children}:any) => {
    const [user, setUser] = useState<User>({
        data: null,
        error: null,
        loading: true 
    });

    const token = localStorage.getItem("token")

    if(token){
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`
    }

    const fetchUser = async () => {
        const {data} = await axios.get("http://localhost:8080/auth/me")
        console.log(data)
    }

    fetchUser()
}

export {UserContext,UserProvider}