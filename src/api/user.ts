import { sendGet, sendPost } from '.'

export const signIn = (data: any) => sendPost('/signin', data)
export const signUp = (data: any) => sendPost('/signup', data)
export const signOut = () => sendGet('/signout')
