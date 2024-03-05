import { userUrl } from '@/constants/urls'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { refreshAccessToken } from '../../../actions/user'

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwt.decode(token)

    return (
      decodedToken && decodedToken.exp && Date.now() >= decodedToken.exp * 1000
    )
  } catch (error) {
    console.error('Error decoding or validating token:', error)
    return true
  }
}

export async function GET() {
  try {
    const nextCookies = cookies()
    const accessToken = nextCookies.get('accessToken')?.value

    if (!accessToken || isTokenExpired(accessToken)) {
      const refreshToken = nextCookies.get('refreshToken')?.value

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken)

        nextCookies.set('accessToken', newAccessToken)
      } else {
        return new Response('Refresh token is missing', { status: 401 })
      }
    }

    const response = await axios.get(userUrl(), {
      headers: {
        Authorization: `Bearer ${nextCookies.get('accessToken')?.value}`,
      },
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    return new Response('Error occurred in getCurrentUser:', { status: 500 })
  }
}
