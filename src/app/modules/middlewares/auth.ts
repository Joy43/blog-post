import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';

import { TUserRole } from '../user/user.interface';
import { User } from '../user/user.model';


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new Error( 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      "secret",
    ) as JwtPayload;

    console.log({decoded})

    const { role, email} = decoded;

    // ------checking  user  exist------------
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('This user is not found !')
  }

  //---------- checking user is blocked---------
  const status = user?.status

  if (status === 'blocked') {
    throw new Error('This user is blocked ! !')
  }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error(
        'You are not authorized',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;