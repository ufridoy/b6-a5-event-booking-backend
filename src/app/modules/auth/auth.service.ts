import { auth } from "../../lib/auth";

interface IRegisterUserPayload {
    name: string;
    email: string;
    password: string;
}

interface ILoginUserPayload {
    email: string;
    password: string;
}


const registerUser = async (payload: IRegisterUserPayload) => {
    const  {name, email, password} = payload;

    const result = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        },
        returnHeaders: true
    })

    return result;
}

const loginUser = async (payload: ILoginUserPayload) => {
    const {email, password} = payload;

    const result = await auth.api.signInEmail({
        body: {
            email,
            password
        },
        returnHeaders: true
    })

    return result;
}


export const AuthService = {
    registerUser,
    loginUser
}