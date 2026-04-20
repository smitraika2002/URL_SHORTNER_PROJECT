 // 🔐 Generate salt
import { randomBytes,createHmac } from 'node:crypto';

export function hashpasswordwithsalt(password){
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
    return { password: hashedPassword, salt };
}