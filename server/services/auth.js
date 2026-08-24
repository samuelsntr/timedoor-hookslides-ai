import crypto from 'node:crypto';

const hash = (password, salt = crypto.randomBytes(16).toString('hex')) => new Promise((resolve, reject) => crypto.scrypt(password, salt, 64, (e, key) => e ? reject(e) : resolve(`${salt}:${key.toString('hex')}`)));
const verify = (password, stored) => new Promise((resolve, reject) => { const [salt, hex] = stored.split(':'); crypto.scrypt(password, salt, 64, (e, key) => e ? reject(e) : resolve(crypto.timingSafeEqual(key, Buffer.from(hex, 'hex')))); });
export function createAuthRepository(db) {
  return {
    async register(email, password) { const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email); if (existing) return null; const id = crypto.randomUUID(); db.prepare('INSERT INTO users (id,email,password_hash,created_at) VALUES (?,?,?,?)').run(id, email, await hash(password), new Date().toISOString()); return { id, email }; },
    async login(email, password) { const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email); if (!row || !(await verify(password, row.password_hash))) return null; return { id: row.id, email: row.email }; },
    find(id) { return db.prepare('SELECT id,email FROM users WHERE id = ?').get(id); }
  };
}
export const sessionId = () => crypto.randomBytes(32).toString('hex');
