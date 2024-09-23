"use server"

import { cookies } from "next/headers";

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
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Token validation failed')
  } catch (error) {
    console.error(error)
  }

  return true
}



export async function handleSignin({ email, password }: LoginCredential) {

  if (!password || !email) {
    console.log("Invalid credentials");
    return null;
  }
  try {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/v1/auth/login`, {
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

    validateToken(data.token)

    cookies().set('token', data.token, {
      httpOnly: true,
      secure: true,
    })

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
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/v1/auth/register`, {
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

    validateToken(data.token)

    cookies().set('token', data.token, {
      httpOnly: true,
      secure: true,
    })

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
  const token = cookies().get('token')?.value
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (res.status != 200) {
    return {
      status: res.status,
      error: "Logout failed"
    }
  }

  cookies().set('token', '', {
    expires: 1
  })

  return {
    status: res.status,
    message: "Logout successafully"
  }
}
