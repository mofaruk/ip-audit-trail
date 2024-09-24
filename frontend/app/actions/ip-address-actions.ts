"use server"

import { getAuthUserToken } from "./auth-actions"
import { ipFormSchema } from "@/schemas/ip-form-schema"
import { z } from "zod"

export async function fetchIpAddress(id: string) {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/v1/ip-service/ip/${id}`,  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAuthUserToken()}`,
      },
    })
    if (!res.ok) return []

    return await res.json()
}

export async function createOrUpdateIpAddress(action: string, data: z.infer<typeof ipFormSchema>, id: string | null) {
  const apiUri = id ? `api/v1/ip-service/ip/${id}` : `api/v1/ip-service/ip`
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/${apiUri}`,  {
    method: action == 'create' ? 'POST' : 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthUserToken()}`,
    },
    body: JSON.stringify(data)
  })

  return res.ok
}

export async function deleteIpAddress(id: string) {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/v1/ip-service/ip/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthUserToken()}`,
    },
  })
  console.log(res.status, res.statusText)
  return res.ok
}
