import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../service";
import { SignInTypes, SignUp } from "../types";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../utils/notifications";
import { AccessToken } from "../../../utils/tokens";

export function useSignInMutation() {
    const moveIt = useNavigate()
    return  useMutation({
        mutationFn: (data: SignInTypes) => signIn(data),
        onSuccess: (response) => {
            const { access_token } = response?.data?.data?.tokens;
            AccessToken(access_token);
            moveIt("/admin-layout")
            Notification({
                type: "success",
                message: response?.data?.message
            })
        },
        onError: (error) => {
            Notification({
                type: "error",
                message: error?.message
            })
        }
    })
}

// ======= Sign Up ==========
export function useSignUpMutation(){
    return useMutation({
        mutationFn: (data: SignUp): any => signUp(data)
    })
}