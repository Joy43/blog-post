export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    status: 'in-progress' | 'blocked';
    isBlocked: boolean;
    isDeleted: boolean;
  };
  