import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const userMock = {
    id: 1,
    username: 'test name',
    role: 'user',
    email: 'admin@admin.com',
    password: 'test_password',
  };

  const validToken = jwt.sign({ id: userMock.id }, process.env.JWT_SECRET || 'secret');

  const validLogin = {
    email: 'test@test.com',
    password: bcrypt.hashSync(userMock.password, 10),
  };

  const loginWithouEmail = {
    password: 'test_password',
  };

  const loginWithouPassword = {
    email: 'test@test.com',
  };

  export { userMock, validLogin, loginWithouEmail, loginWithouPassword, validToken };
  