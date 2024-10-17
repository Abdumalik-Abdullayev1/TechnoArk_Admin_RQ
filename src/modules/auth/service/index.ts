import axiosInstance from "@api";
import { SignInTypes, SignUp } from "../types";
// ======= Sign In =========

export async function signIn (data: SignInTypes){
    return await axiosInstance.post("/auth/sign-in", data)
}

// ======= Sign Up =========

export async function signUp (data: SignUp){
    return await axiosInstance.post('/auth/admin/sign-up', data)
}