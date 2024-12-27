import jwt from 'jwt-simple';

const SECRET_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || "";

export const encodeToJWT = (data: object): string => {
  const token = jwt.encode(data, SECRET_KEY);
  return token;
};

export const decodeToJWT = (token: string) => {
  try {
    const decoded = jwt.decode(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error('Không thể giải mã token:', err);
    return null;
  }
};