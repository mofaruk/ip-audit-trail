import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

const secretKey = process.env.ENCRYPTION_SECRET_KEY;

export const encryptToken = (token: string): string => {
  return AES.encrypt(token, secretKey).toString();
};

export const decryptToken = (encryptedToken: string): string => {
  const bytes = AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
