"use client"

import { useState, useCallback } from "react"

export function useCookies() {
  const getCookie = useCallback((name: string) => {
    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=")
      if (cookieName.trim() === name) {
        return cookieValue
      }
    }
    return null
  }, [])

  const setCookie = useCallback(
    (name: string, value: string, options: { [key: string]: any } = {}) => {
      let cookieString = `${name}=${value}`

      if (options.path) cookieString += `; path=${options.path}`
      if (options.maxAge) cookieString += `; max-age=${options.maxAge}`
      if (options.domain) cookieString += `; domain=${options.domain}`
      if (options.secure) cookieString += "; secure"
      if (options.sameSite) cookieString += `; samesite=${options.sameSite}`

      document.cookie = cookieString
    },
    []
  )

  const deleteCookie = useCallback((name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }, [])

  return { getCookie, setCookie, deleteCookie }
}
