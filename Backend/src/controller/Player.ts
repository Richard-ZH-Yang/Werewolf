import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Player from '../models/player';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const register = (req: Request, res: Response, next: NextFunction) => {
    let { email, name, psw, psw_repeat } = req.body;

    if(psw != psw_repeat) {
        return res.status(500).json({
            error: new error( "password not matched!")
        });
    }

    Player.find({email : email}, function (err, docs) {
        if (docs.length){
            return res.status(500).json({
                error: new error( "password not matched!")
            });
        }
    });

    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        email,
        name,
        psw,
        psw_repeat
    });

    return player
        .save()
        .then((result) => {
            return res.status(201).json({
                player: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const logIn = (req: Request, res: Response, next: NextFunction) => {
    Player.find()
        .exec()
        .then((players) => {
            return res.status(200).json({
                player: players,
                count: players.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { register, getAllPlayers };
