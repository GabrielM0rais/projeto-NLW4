import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

describe("Users", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })
    
    afterAll(async () => {
        const conn =  getConnection();
        await conn.dropDatabase();
        await conn.close()
    })


   it("Should be able to create a new user", async () => {
        const response = await request(app).post('/users')
            .send({ 
                email: "teste@example.com",
                name: "teste Example"
            })
        
        expect(response.status).toBe(201);
   });

   it("Should not be able to create a user with exists email", async () => {
        const response = await request(app).post('/users')
            .send({ 
                email: "teste@example.com",
                name: "teste Example"
            })
        
        expect(response.status).toBe(404);
    });
})
