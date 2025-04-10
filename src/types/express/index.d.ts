//  Create this file to extend the Express Request type
import { Request } from 'express';
import { User } from '../user'; // Assuming you have a User type defined

declare global {
  namespace Express {
    interface Request {
      user?: User; //  Optional user property on the Request object
    }
  }
}