import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export default hashPassword;
