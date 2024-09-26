"use server"

import { getAuthUserToken } from "./auth-actions"
import { ipFormSchema } from "@/schemas/ip-form-schema"
import { z } from "zod"

export async function fetchIpAddress(id: string) {
    const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip/${id}`,  {
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
  const apiUri = id ? `api/ip-service/v1/ip/${id}` : `api/ip-service/v1/ip`
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
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip/${id}`, {
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
