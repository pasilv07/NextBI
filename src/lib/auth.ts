const JWT_SECRET = process.env.JWT_SECRET || 'walter-sa-super-secret-key-2026-bi-dashboard-app';

async function getCryptoKey() {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(JWT_SECRET),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign', 'verify']
  );
}

export interface UserSession {
  email: string;
  name: string;
  role: string;
}

// Custom simple JWT signer using W3C Web Crypto (Edge-safe)
export async function signJWT(payload: UserSession, expiresInSeconds = 86400): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };
  
  const enc = new TextEncoder();
  const headerStr = btoa(JSON.stringify(header))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const payloadStr = btoa(JSON.stringify(fullPayload))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  
  const tokenInput = `${headerStr}.${payloadStr}`;
  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(tokenInput));
  
  const signatureStr = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    
  return `${tokenInput}.${signatureStr}`;
}

// Custom simple JWT verifier using W3C Web Crypto (Edge-safe)
export async function verifyJWT(token: string): Promise<UserSession | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerStr, payloadStr, signatureStr] = parts;
    
    const tokenInput = `${headerStr}.${payloadStr}`;
    const key = await getCryptoKey();
    
    // Decode base64url signature
    const sigBin = atob(signatureStr.replace(/-/g, '+').replace(/_/g, '/'));
    const sigBuf = new Uint8Array(sigBin.length);
    for (let i = 0; i < sigBin.length; i++) {
      sigBuf[i] = sigBin.charCodeAt(i);
    }
    
    const enc = new TextEncoder();
    const isValid = await crypto.subtle.verify('HMAC', key, sigBuf, enc.encode(tokenInput));
    if (!isValid) return null;
    
    // Decode base64url payload
    const payloadBin = atob(payloadStr.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(decodeURIComponent(escape(payloadBin)));
    
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null; // Expired
    }
    
    return {
      email: payload.email,
      name: payload.name,
      role: payload.role
    };
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}
