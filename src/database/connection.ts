import mongoose from "mongoose";

export const connect = (url: string) => {
    //console.log('connected to cluster')
    return mongoose.connect(url);
};
