import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../service";
import { SignIn, SignUp } from "../types";
export function useSignInMutation() {
    return  useMutation({
        mutationFn: (data: SignIn): any => signIn(data)
    })
}

// ======= Sign Up ==========
export function useSignUpMutation(){
    return useMutation({
        mutationFn: (data: SignUp): any => signUp(data)
    })
}