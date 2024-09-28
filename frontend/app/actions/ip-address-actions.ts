"use server"

import { getAuthUserToken } from "./auth-actions"
import { ipFormSchema } from "@/schemas/ip-form-schema"
import { cookies } from "next/headers"
import { z } from "zod"

export async function fetchIpAddress(id: string) {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip/${id}`,  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAuthUserToken()}`,
        'X-AT-Session': `${cookies().get('at_session')?.value}`,
      },
    })
    if (!res.ok) return []

    return await res.json()
}

export async function createOrUpdateIpAddress(action: string, data: z.infer<typeof ipFormSchema>, id: string | null) {
  const apiUri = id ? `api/ip-service/v1/ip/${id}` : `api/ip-service/v1/ip`
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/${apiUri}`,  {
    method: action == 'create' ? 'POST' : 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
    body: JSON.stringify(data)
  })

  return res.ok
}

export async function deleteIpAddress(id: string) {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
  })
  console.log(res.status, res.statusText)
  return res.ok
}
