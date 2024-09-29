"use server"

import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { decryptToken, encryptToken } from "@/lib/crypto";
import { useRouter } from "next/navigation";


type LoginCredential = {
  email: string,
  password: string,
}

type RegisterFormInput = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

const validateToken = async (token: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/auth-service/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Token validation failed')
  } catch (error) {
    console.error(error)
    return false
  }

  return true
}



export async function handleSignin({ email, password }: LoginCredential) {

  if (!password || !email) {
    console.log("Invalid credentials");
    return null;
  }
  try {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/auth-service/v1/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    // If no user is found or wrong credentials
    if (res.status != 200) {
      return {
        status: res.status,
        error: "Credential doesn't match!"
      }
    }
    const data = await res.json();

    if (!validateToken(data.token)) {
      unsetAuthTokenFromCookie()
      return {
        status: 404,
        error: 'Cannot validate credential',
      }
    }
    const decodedToken = jwt.decode(data.token)
    await setAuthTokenOnCookie(data.token, decodedToken.exp)

    return {
      status: res.status,
      token: data.token
    };

  } catch (error) {
    console.error('Login failed:', error);
    return {
      status: 404,
      error: error,
    };
  }
}

export async function handleSignup({ name, email, password, password_confirmation }: RegisterFormInput) {

  if (!name.trim() || !email || !password.trim() || !password_confirmation.trim()) {
    return {
      status: 400,
      error: "Regitration information is not correct!"
    }
  }
  try {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/auth-service/v1/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      })
    });

    if (res.status != 201) {
      return {
        status: res.status,
        error: "Something went wrong!"
      }
    }
    const data = await res.json();

    if (!validateToken(data.token)) {
      await unsetAuthTokenFromCookie()
      return {
        status: 404,
        error: 'Something went wrong',
      }
    }
    const decodedToken = jwt.decode(data.token)
    await setAuthTokenOnCookie(data.token, decodedToken.exp)

    return {
      status: res.status,
      token: data.token
    };

  } catch (error) {
    console.error('Registration failed:', error);
    return {
      status: 404,
      error: error,
    };
  }
}

export async function handleLogout() {
  console.log("Hello" + "  " + `${process.env.AUTH_MICROSERVICE_URL}/api/auth-service/v1/logout ${await getAuthUserToken()}`)

  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/auth-service/v1/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthUserToken()}`,
    }
  })

  if (res.status != 200) {
    return {
      status: res.status,
      error: "Logout failed"
    }
  }
  cookies().delete('token')

  return {
    status: res.status,
    message: "Logout successafully"
  }
}


export async function getAuthUser() {
  const encryptedToken = cookies().get('token')?.value

  if (!encryptedToken) {
    return null
  }

  try {
    return jwt.decode(decryptToken(encryptedToken));
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getAuthUserToken() {
  const encryptedToken = cookies().get('token')?.value

  if (!encryptedToken) {
    return false
  }

  const token =  decryptToken(encryptedToken);

  const decodedToken = jwt.decode(token)

  if (((decodedToken.exp - 60*10) * 1000) > Date.now() ) {
    return token
  }
  const newToken =  await refreshToken(token)

  if (!newToken) {
    return false
  }

  const decodedNewToken = jwt.decode(newToken)
  await setAuthTokenOnCookie(newToken, decodedNewToken.exp)
  return newToken

}

export async function refreshToken (token: string) {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/auth-service/v1/refresh`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (res.status != 200) {
    return false;
  }
  const data = await res.json();
  return data.token
}

export async function setAuthTokenOnCookie (token: string, exp?: number) {
  cookies().set('token', encryptToken(token), {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    maxAge: exp ? exp : undefined,
  })
}

export async function unsetAuthTokenFromCookie () {
  cookies().delete('token')
}