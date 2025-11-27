"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import Keycloak from "keycloak-js"
import { keycloakConfig } from "./config"

interface KeycloakContextType {
  keycloak: Keycloak | null
  initialized: boolean
  authenticated: boolean
  token: string | null
  user: KeycloakUser | null
  login: () => void
  logout: () => void
  register: () => void
}

interface KeycloakUser {
  id: string
  email: string
  name: string
  username: string
  emailVerified: boolean
}

const KeycloakContext = createContext<KeycloakContextType>({
  keycloak: null,
  initialized: false,
  authenticated: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
})

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [initialized, setInitialized] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<KeycloakUser | null>(null)

  useEffect(() => {
    const kc = new Keycloak({
      url: keycloakConfig.url,
      realm: keycloakConfig.realm,
      clientId: keycloakConfig.clientId,
    })

    kc.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: typeof window !== "undefined" 
        ? `${window.location.origin}/silent-check-sso.html` 
        : undefined,
      pkceMethod: "S256",
    })
      .then((auth) => {
        setKeycloak(kc)
        setInitialized(true)
        setAuthenticated(auth)
        if (auth && kc.token) {
          setToken(kc.token)
          setUser({
            id: kc.tokenParsed?.sub || "",
            email: kc.tokenParsed?.email || "",
            name: kc.tokenParsed?.name || "",
            username: kc.tokenParsed?.preferred_username || "",
            emailVerified: kc.tokenParsed?.email_verified || false,
          })
        }
      })
      .catch((err) => {
        console.error("Keycloak init error:", err)
        setInitialized(true)
      })

    // Token refresh
    const refreshInterval = setInterval(() => {
      if (kc.authenticated) {
        kc.updateToken(70)
          .then((refreshed) => {
            if (refreshed && kc.token) {
              setToken(kc.token)
            }
          })
          .catch(() => {
            console.error("Failed to refresh token")
          })
      }
    }, 60000)

    return () => clearInterval(refreshInterval)
  }, [])

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  const logout = useCallback(() => {
    keycloak?.logout({ redirectUri: window.location.origin })
  }, [keycloak])

  const register = useCallback(() => {
    keycloak?.register()
  }, [keycloak])

  return (
    <KeycloakContext.Provider
      value={{
        keycloak,
        initialized,
        authenticated,
        token,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  )
}

export const useKeycloak = () => useContext(KeycloakContext)



