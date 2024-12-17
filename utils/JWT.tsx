import jwt from 'jwt-simple';

export const encodeToJWT = (data: object): string => {
  const SECRET_KEY = "4e6f7274682072616e646f6d20736563726574206b65792e";
  const token = jwt.encode(data, SECRET_KEY);
  return token;
};

export const decodeToJWT = (token: string) => {
  try {
    const SECRET_KEY = "4e6f7274682072616e646f6d20736563726574206b65792e";
    const decoded = jwt.decode(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error('Không thể giải mã token:', err);
    return null;
  }
};