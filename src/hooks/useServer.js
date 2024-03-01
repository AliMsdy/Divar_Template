import { axiosInstance } from "@/configs/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const useQueryCall = (
  key,
  { method = "GET", ...config },
  options = {},
  onErrorHandler,
  queryFunction
) =>
  useQuery({
    queryKey: key || [config.url, config.params].filter(Boolean),
    queryFn:
      queryFunction ||
      async function () {
        try {
          const { data } = await axiosInstance.request({
            method,
            ...config,
          });
          return data;
        } catch (error) {
          onErrorHandler(error);
        }
      },
    ...options,
  });

const useMutateCall = (key, options = {}) =>
  useMutation({
    mutationKey: key,
    mutationFn: ({ method = "POST", ...config }) =>
      axiosInstance.request({
        method,
        ...config,
      }),
    ...options,
  });

export { useMutateCall, useQueryCall };
