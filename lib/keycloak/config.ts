export const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "habitflow",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "habitflow-frontend",
}

export const keycloakAdminConfig = {
  url: process.env.KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.KEYCLOAK_REALM || "habitflow",
  clientId: process.env.KEYCLOAK_CLIENT_ID || "habitflow-backend",
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
}



