/**
 * Computes a SHA-256 hash of a string using native Web Crypto API.
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  
  // Use crypto from window/globalThis
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error('Web Crypto API is not available in this environment');
  }

  const hashBuffer = await cryptoObj.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Computes the final password hash according to requirements:
 * FinalPassword = SHA256( SHA256(password) + saltkey )
 */
export async function computeFinalPassword(password: string, saltkey: string): Promise<string> {
  const hashPass = await sha256(password);
  const finalPassword = await sha256(hashPass + saltkey);
  return finalPassword;
}
