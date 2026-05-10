"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Notification } from "@/types/index";

export function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery<{ notifications: Notification[]; unreadCount: number }>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await axios.get("/api/notifications");
      return data;
    },
    refetchInterval: 1000 * 60, // Poll every minute for new notifications
  });

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      await axios.patch("/api/notifications", { notificationId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications: query.data?.notifications ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
    isLoading: query.isLoading,
    markAsRead: markAsRead.mutate,
  };
}
