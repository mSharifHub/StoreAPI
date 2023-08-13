import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoty: string;
}

const ProductScheme: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
});


const ProductModel = mongoose.model<Product>('Product',ProductScheme)