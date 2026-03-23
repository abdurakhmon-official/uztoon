import { PrismaClient } from '@prisma/client';
import { UserColumnsForUI } from './dbHelpers';

if (!global.__db) {
  global.__db = new PrismaClient().$extends({
    model: {
      user: {
        async clientUserById(id: string) {
          return global.__db.user.findUnique({
            where: { id },
            select: UserColumnsForUI,
          });
        },
      },
    },
    result: {
      user: {
        fullName: {
          needs: { firstName: true, lastName: true },
          compute(user) {
            return `${user.firstName} ${user.lastName}`;
          },
        },
        isAdmin: {
          needs: { role: true },
          compute(user) {
            return user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';
          },
        },
        isSuperAdmin: {
          needs: { role: true },
          compute(user) {
            return user.role === 'SUPER_ADMIN';
          },
        },
      },
    },
  });
}

export default global.__db;
