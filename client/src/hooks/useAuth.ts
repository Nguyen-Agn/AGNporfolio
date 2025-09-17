import { useQuery } from "@tanstack/react-query";
import { UserMin } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading } = useQuery<UserMin | null>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user", { credentials: "include" });
      if (!res.ok) return null;
      return res.json() as Promise<UserMin>;
    },
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
