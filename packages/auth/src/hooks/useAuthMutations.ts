import { useMutation } from '@tanstack/react-query';
import { getApiClient } from '@repo/api';
import type {
  GetTokenRequest,
  GetTokenResponse,
  ValidateUserRequest,
  ValidateUserResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '@repo/types';

export const useGetTokenMutation = () => {
  return useMutation({
    mutationFn: async (payload: GetTokenRequest) => {
      const response = await getApiClient().post<GetTokenResponse>('/auth/getToken', payload);
      return response.data;
    },
  });
};

export const useValidateUserMutation = () => {
  return useMutation({
    mutationFn: async (payload: ValidateUserRequest) => {
      const response = await getApiClient().post<ValidateUserResponse>('/auth/validateUser', payload);
      return response.data;
    },
  });
};

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: async (payload: SendOtpRequest) => {
      const response = await getApiClient().post<SendOtpResponse>('/auth/sendOtp', payload);
      return response.data;
    },
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: async (payload: VerifyOtpRequest) => {
      const response = await getApiClient().post<VerifyOtpResponse>('/auth/verifyOtp', payload);
      return response.data;
    },
  });
};

export const useValidateTokenMutation = () => {
  return useMutation({
    mutationFn: async (payload: ValidateTokenRequest) => {
      const response = await getApiClient().post<ValidateTokenResponse>('/auth/validateToken', payload);
      return response.data;
    },
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordRequest) => {
      const response = await getApiClient().post<UpdatePasswordResponse>('/auth/updatePassword', payload);
      return response.data;
    },
  });
};
