import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import Player from '../interfaces/player';
import * as stream from "stream";

const PlayerSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        psw: { type: String, required: true },
        winings: { type: Number, required: true}
    },
    {
        timestamps: true
    }
);

PlayerSchema.post<Player>('save', function () {
    logging.info('Mongo', 'Checkout the player information I just saved: ', this);
});

export default mongoose.model<Player>('Player', PlayerSchema);
