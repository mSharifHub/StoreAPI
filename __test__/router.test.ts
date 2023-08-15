import supertest from "supertest";
import app from "../src/app";

describe('StoreApi',()=>{

    describe("Products API", () => {

        it("should get all produrcts", async () => {
            const response = await supertest(app).get("/api/v1/products");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("result");
            expect(Array.isArray(response.body.result)).toBeTruthy();
        });
    
    });

    describe("Products")
    
    
    




})


