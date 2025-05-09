export function useApi<T = any>() {
  const baseURL = useRuntimeConfig().public.API_BASE_URL

  const request = async (
    method: 'GET' | 'POST' | 'PUT' | "PATCH" | 'DELETE',
    url: string,
    payload?: any,
    options: any = {}
  ) => {
    return await $fetch<T>(url, {
      baseURL,
      method,
      ...(method === 'GET' || method === 'DELETE' ? { params: payload } : { body: payload }),
      ...options
    })
  }

  return request
}
