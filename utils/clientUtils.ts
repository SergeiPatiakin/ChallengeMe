export const COOKIE_KEY = 'id_token'

export const callMainApi = (method: string, url: string, body?: any) => {
  const idTokenCookie = document.cookie.split('; ').find(s => s.startsWith(`${COOKIE_KEY}=`))
  if (idTokenCookie === undefined) {
    return Promise.reject('Not authenticated, cannot make API calls')
  } else {
    const idToken = idTokenCookie.substring(COOKIE_KEY.length + 1)
    return fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: body && JSON.stringify(body),
    })
  }
}

export const login = (idToken: string) => {
  document.cookie = `id_token=${idToken}; path=/`
  window.location.href = '/'
}

export const logout = () => {
  document.cookie = `id_token=; path=/`
  window.location.href = '/'
}

export const stopPropagation = (e: any) => {
  e.stopPropagation()
}
