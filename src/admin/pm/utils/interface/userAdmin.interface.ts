export interface ICreateUserAdminPayload {
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  role: number;
  password: string;
}

export interface IUpdateAdminUserPayload {
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  device_token?: string;
  role?: number;
  password?: string;
  employee_id?: number;
}

export interface IcreateRolePermission {
  role_id: Number;
  h_permission_id: Number;
  permission_type: String;
  created_by?: Number;
}
