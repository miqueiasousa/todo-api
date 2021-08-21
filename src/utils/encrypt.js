import bcrypt from "bcrypt";

export async function hash(text) {
  const SALT_ROUNDS = 8;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const encryptedData = await bcrypt.hash(text, salt);

  return encryptedData;
}

export async function compare(text, hash) {
  const isSame = await bcrypt.compare(text, hash);

  return isSame;
}
