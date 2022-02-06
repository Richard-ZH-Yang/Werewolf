import { Document } from 'mongoose';

export default interface Player extends Document {
    email: string;
    name: string;
    psw: string;
}
