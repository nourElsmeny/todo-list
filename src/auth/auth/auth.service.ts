import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from } from 'rxjs';

import bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    async generateJWT(user: object){
        return await this.jwtService.sign(user);
    }

    async hashPassword(password: string){
        const result = await bcrypt.hash(String(password),"$2b$10$hogojYV3kTXMm9ai0j9LyO");
        return result;
    }

    async comparePassword(password: string, hashedpassword: string){
        const result = await bcrypt.compare(String(password),hashedpassword);
        return result;
    }
}
