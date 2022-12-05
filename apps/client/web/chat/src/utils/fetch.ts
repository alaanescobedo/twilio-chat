// TODO: Configure and refactor duplicated RequestOptions, priority: Medium
const BASE_URL = 'http://localhost:3001';

const post = async<T>(url: string, options: RequestInit = {}): Promise<T> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3001'
    },
    body: options.body
  }
  return await fetch(`${BASE_URL}${url}`, requestOptions)
    .then(handleResponse)
}

const get = async<T>(url: string): Promise<T> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3001'
    }
  }

  return await fetch(`${BASE_URL}${url}`, requestOptions)
    .then(handleResponse)
}

const patch = async<T>(url: string, options: RequestInit = {}) => {
  const requestOptions: RequestInit = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3001'
    },
    body: options.body
  }

  return await fetch(`${BASE_URL}${url}`, requestOptions)
    .then(handleResponse)
}

const deleteMethod = async<T>(url: string): Promise<T> => {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3001'
    }
  }

  return await fetch(`${BASE_URL}${url}`, requestOptions)
    .then(handleResponse)
}

const handleResponse = async (response: Response) => {
  const dataText = await response.text()
  const data = dataText ? JSON.parse(dataText) : {}

  if (!response.ok || !data) {
    console.log({ response, data })
    const errorData = {
      status: response.status,
      message: response.statusText,
    }
    const error = data || errorData
    return Promise.reject({ requestedUrl: response.url, error })
  }

  return data
}

export default {
  post,
  get,
  patch,
  delete: deleteMethod
}