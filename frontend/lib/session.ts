"use server"

import { getAuthUser } from "@/app/actions/auth-actions"
import { randomUUID } from "crypto"
import { cookies } from "next/headers"

export const checkSession = () => {
  if (!cookies().get('at_session')) {
    cookies().set('at_session', randomUUID() + '', {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      maxAge: undefined
    })
  }

  if (!getAuthUser()) {
    cookies().delete('token')
  }
}
