import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import Room from '../interfaces/room';

const RoomSchema: Schema = new Schema(
    {
        players: { type: Array, required: true },
        roomUmber: { type: Number, required: true },
        judge: { type: Object, required: true}
    },
    {
        timestamps: true
    }
);

RoomSchema.post<Room>('save', function () {
    logging.info('Mongo', 'Checkout the room I just saved: ', this);
});

export default mongoose.model<Room>('Book', RoomSchema);
