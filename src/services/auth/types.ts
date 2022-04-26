export type AdminAuthStatus = "authorized" | "disconnected" | "unauthorized";

export interface AuthState {
  tca: { token: string | null };
  admin: { status: AdminAuthStatus };
}
