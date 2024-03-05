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
    throw error.response?.data || error.message
  }
}

export async function loginUser(userData: { email: string; password: string }) {
  try {
    const response = await axios.post(loginUrl(), userData, { headers })
    return response.data
  } catch (error: any) {
    throw error.response?.data || error.message
  }
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(refreshTokenUrl(), {
      refreshToken: refreshToken,
    })

    return response.data.accessToken
  } catch (error: any) {
    throw error.response?.data || error.message
  }
}

export const fetchCurrentUser = async (accessToken?: string) => {
  if (accessToken) {
    try {
      const res = await axios.get('/api/user/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return res.data
    } catch (error: any) {
      throw Error(error.response?.data || error.message)
    }
  }
}
