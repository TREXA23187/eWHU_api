const crypto = require("crypto");

const key = "751f621ea5c8f930";
const iv = "2624750004598718";

/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */

const encrypt = function (data) {
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let crypted = cipher.update(data, "utf8", "binary");
  crypted += cipher.final("binary");
  crypted = Buffer.from(crypted, "binary").toString("base64");
  return crypted;
};

/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
const decrypt = function (crypted) {
  crypted = Buffer.from(crypted, "base64").toString("binary");
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decoded = decipher.update(crypted, "binary", "utf8");
  decoded += decipher.final("utf8");
  return decoded;
};

module.exports = { encrypt, decrypt };
