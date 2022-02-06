import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import Werewolf from '../interfaces/werewolf';
import * as stream from "stream";

const WerewolfSchema: Schema = new Schema(
    {
        room: { type: Object, required: true }
    },
    {
        timestamps: true
    }
);

WerewolfSchema.post<Werewolf>('save', function () {
    logging.info('Mongo', 'Checkout the werewolf I just saved: ', this);
});

export default mongoose.model<Werewolf>('Player', WerewolfSchema);
