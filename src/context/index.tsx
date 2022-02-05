import { createContext, useState,useEffect } from "react";
import axios from "axios"
import { SERVER_URL } from "../constants";


interface User {
    data: {
        id:string,
        email:string,
        customerStripeId: string
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
        const {data:response} = await axios.get(`${SERVER_URL}/auth/me`)
        if(response.data && response.data.user){
            setUser({
                data: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    customerStripeId: response.data.user.customerStripeId
                },
                loading: false,
                error: null
            })
        } else if(response.data && response.data.errors.length){
            setUser({
                data: null,
                loading: false,
                error: response.errors[0].msg
            })
        }
    }

    useEffect(() => {
        //only make this request if we have token
        if(token){
            fetchUser()
        }else{
            setUser({
                data:null,
                error:null,
                loading: false
            })
        }
    }, []);
    

    return <UserContext.Provider value={[user,setUser]}>
        {children}
    </UserContext.Provider>
}

export {UserContext,UserProvider}