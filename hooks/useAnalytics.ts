"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AnalyticsDashboard } from "@/types/analytics";

export function useAnalytics(organizationId: string, period = "30d") {
  return useQuery<AnalyticsDashboard>({
    queryKey: ["analytics", organizationId, period],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/analytics?organizationId=${organizationId}&period=${period}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Revenue-specific query with separate cache key for chart data
export function useRevenueData(organizationId: string) {
  return useQuery({
    queryKey: ["analytics", "revenue", organizationId],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/analytics?organizationId=${organizationId}&type=revenue`
      );
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
