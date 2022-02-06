import { Document } from 'mongoose';
import Player from "../models/player";

export default interface Werewolf extends Document {
    room: any;
}
