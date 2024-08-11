import {} from '';
import { IAdmin } from './src/common/types/commonTypes';

declare global {
  namespace Express {
    interface Request {
      admin: IAdmin;
      upFiles: string[];
    }
  }
}
