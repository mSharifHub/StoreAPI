import supertest from "supertest";
import app from "../src/app";
import { getAllProducts } from '../src/controllers/products';

describe("StoreApi", () => {

    describe("Get All Products ", () => {
        it("should get all products", async () => {
            const response = await supertest(app).get("/api/v1/products");
            expect(response.status).toBe(200);
        });
    });

    describe("Get Single Product", () => {
        it("given a product is not listed, it should give a status code 404", async () => {
            const productName = "This product does not exist";
            const response = await supertest(app).get(`/api/v1/products/getSingleProduct/${productName}`);
            expect(response.status).toBe(404);
            expect(typeof response.body).toBe("object");
            expect(response.body).toHaveProperty("message", "Product not listed in the database");
        });
    });

});

