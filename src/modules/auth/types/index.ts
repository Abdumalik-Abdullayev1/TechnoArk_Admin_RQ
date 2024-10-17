export interface SignInTypes {
    phone_number?: string,
    password?: string,
}
export interface SignUp extends SignInTypes {
    first_name: string,
    last_name: string,
    email: string,
}