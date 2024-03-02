import axios from 'axios'

import { loginUrl, refreshTokenUrl, registerUrl } from '../constants/urls'

export interface User {
  appliedJobs: []
  email: string
  id: string
  profileImage: string
}

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

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(refreshTokenUrl(), {
      refreshToken: refreshToken,
    })

    return response.data.accessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw error
  }
}

export const fetchCurrentUser = async () => {
  try {
    const res = await axios.get('/api/user/')
    return res.data
  } catch (error: any) {
    console.error(
      'Error during fetching current user:',
      error.response?.data || error.message,
    )
  }
}
