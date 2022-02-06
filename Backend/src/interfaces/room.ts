import { Document } from 'mongoose';
import Player from "../models/player";

export default interface Room extends Document {
    players: any[];
    judge: any;
    room_number: number;
}
