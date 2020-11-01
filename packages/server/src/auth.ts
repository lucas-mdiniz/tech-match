import jwt from 'jsonwebtoken';
import { User } from './model';
import { jwtSecret } from './config';
import { IUser } from './modules/user/UserModel';

export async function getUser(token: string) {
  if (!token) return { user: null };

  token = token.substring(7);

  try {

    const decodedToken = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ _id: (decodedToken as { id: string }).id, 'tokens.token': token});

    if (!user) {
      return { user: null};
    }

    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
}

export async function generateToken(user: IUser) {
  const token = jwt.sign({ id: user._id }, jwtSecret);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
}
