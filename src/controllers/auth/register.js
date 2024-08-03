import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Prisma.user.create({
      data: { name, username, email, passwordHash: hashedPassword },
    });
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

export default register;
