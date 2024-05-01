process.env.NODE_ENV = "test";

const request = require("supertest")
const app = require("./app")
let items = require("./fakeDb")

let popcorn = {
    name: "popcorn",
    price: "5 bucks"
};

beforeEach(function() {
    items.push(popcorn);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", () => {
    test("Gets a list of items", async () => {
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items: [popcorn]});
    });
});

describe("POST /items", () => {
    test("Creating an item", async () => {
        const resp = await request(app).post("/items").send({ name: "juice", price: "100 bucks"})
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({item: {name: "juice", price: "100 bucks"},
        message: "Item added successfully"
        });
    })
})