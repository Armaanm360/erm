export interface ICreateUserAdminPayload {
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  role?: number;
  password: string;
}
export interface IInserAuditTrail {
  module_name: string;
  action_type?: string;
  organization_id: number;
  user_id?: number;
  description?: string;
}

export interface IUpdateAdminPayload {
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  role?: number;
  password?: string;
  socket_id?: any;
}
