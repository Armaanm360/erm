import { Knex } from 'knex';
import { db } from '../app/database';
import UserAdminModel from './UserAdminModel/UserAdmin.model';
import CommonModel from './commonModel/commonModel';

class Models {
  // common models
  public commonModel(trx?: Knex.Transaction) {
    return new CommonModel(trx || db);
  }

  // user admin model
  public UserAdminModel(trx?: Knex.Transaction) {
    return new UserAdminModel(trx || db);
  }
}
export default Models;
