/*
DB Query for common OTP
@Author Shidul Islam <shidul.m360ict@gmail.com>
*/
import {
  ICreateNotification,
  ICreateNotificationEmployee,
  ICreateNotificationSeen,
  IUpdateChangePassModelProps,
  IVerifyModelPassProps,
  TDB,
} from '../../common/types/commonTypes';

import Schema from '../../utils/miscellaneous/schema';

class CommonModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }

  // // insert OTP
  // public async insertOTP(payload: IInsertOTPPayload) {
  //   return await this.db('email_otp')
  //     .withSchema(this.DBO_SCHEMA)
  //     .insert(payload);
  // }

  // // get otp
  // public async getOTP(payload: IGetOTPPayload) {
  //   const check = await this.db('email_otp')
  //     .withSchema(this.DBO_SCHEMA)
  //     .select('id', 'hashed_otp', 'tried')
  //     .andWhere('email', payload.email)
  //     .andWhere('type', payload.type)
  //     .andWhere('matched', 0)
  //     .andWhere('tried', '<', 3)
  //     .andWhereRaw(`"created_at" + interval '3 minutes' > NOW()`);

  //   return check;
  // }

  // update otp
  public async updateOTP(
    payload: { tried: number; matched?: number },
    where: { id: number }
  ) {
    return await this.db('email_otp')
      .withSchema(this.DBO_SCHEMA)
      .update(payload)
      .where(where);
  }

  // user password verify
  public async getUserPassword({
    table,
    schema,
    passField,
    userIdField,
    userId,
  }: IVerifyModelPassProps) {
    return await this.db(table)
      .withSchema(schema)
      .select(passField)
      .where(userIdField, userId);
  }

  // update password
  public async updatePassword({
    table,
    userIdField,
    userId,
    passField,
    schema,
    hashedPass,
  }: IUpdateChangePassModelProps) {
    return await this.db(table)
      .update(passField, hashedPass)
      .withSchema(schema)
      .where(userIdField, userId);
  }
}

export default CommonModel;
