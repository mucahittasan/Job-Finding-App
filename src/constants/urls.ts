import { BASE_API_ADDRESS } from './base'

export const registerUrl = () => {
  return `${BASE_API_ADDRESS}/register`
}
export const loginUrl = () => {
  return `${BASE_API_ADDRESS}/login`
}
export const userUrl = () => {
  return `${BASE_API_ADDRESS}/user`
}
export const refreshTokenUrl = () => {
  return `${BASE_API_ADDRESS}/refresh`
}
