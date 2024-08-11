import { TDB } from '../../common/types/commonTypes';
import { ICreateUserAdminPayload } from '../../utils/interfaces/admin/userAdmin.types';
import Schema from '../../utils/miscellaneous/schema';

class UserAdminModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }
  // get admin
  public async getSingleAdmin(payload: { email?: string; id?: number }) {
    const { email, id } = payload;
    return await this.db('user_admin AS ua')
      .withSchema(this.CRM_SCHEMA)
      .select(
        'ua.id',
        'ua.email',
        'ua.password',
        'ua.name',
        'ua.avatar',
        'ua.role',
        'ua.phone',
        'ua.status',
        'ua.device_token',
        'ua.created_at',
        'ua.employee_id',
        'ua.socket_id',
        'e.name as employee_name',
        'o.name as  org_name',
        'o.id as organization_id',
        'o.logo as logo',
        'o.leave_allowance',
        'o.address'
      )
      // .joinRaw('JOIN crm.employee AS employee ON frd.forward_to = employee.id')
      .leftJoin('organization as o', 'o.id', '=', 'ua.organization_id')
      .leftJoin('employee as e', 'ua.employee_id', '=', 'e.id')
      .where(function () {
        if (email) {
          this.andWhere('ua.email', email);
        }
        if (id) {
          this.andWhere('ua.id', id);
        }
      });
  }
}
export default UserAdminModel;
