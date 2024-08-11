export interface ILoginRes {
  success: boolean;
  message: string;
  code: number;
  data?: { user_id: number; name: string };
  token?: string;
}
