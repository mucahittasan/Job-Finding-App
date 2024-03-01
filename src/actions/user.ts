import axios from 'axios'
import { loginUrl, registerUrl } from '../constants/urls'

const headers = {
  'Content-Type': 'application/json',
}

export async function registerUser(userData: {
  email: string
  password: string
}) {
  try {
    const response = await axios.post(registerUrl(), userData, { headers })
    return response.data
  } catch (error: any) {
    console.error(
      'Error during registration:',
      error.response?.data || error.message,
    )
  }
}

export async function loginUser(userData: { email: string; password: string }) {
  try {
    const response = await axios.post(loginUrl(), userData, { headers })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.error('Error during login:', error.response?.data || error.message)
  }
}
