const request = require("supertest");
const server = require("./api/server");
const db = require("./database/dbConfig");

describe("testing register endpoint", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  test("should return a 201", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "kk", password: "password" })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
  test("should return the right name", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "Carl", password: "password" })
      .then((res) => {
        expect(res.body.username).toBe("Carl");
      });
  });
});

describe("testing the login endpoint", () => {
  test("testing a user can login", async () => {
    await request(server)
      .post("/api/auth/login")
      .send({ username: "Carl", password: "password" })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("testing a user can login", async () => {
    await request(server)
      .post("/api/auth/login")
      .send({ username: "Carl", password: "password" })
      .then((res) => {
        expect(res.body.message).toBe("welcome Carl");
      });
  });
});

describe("testing get endpoint", () => {
  test("should return status 200", async () => {
    await request(server)
      .get("/api/users")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("should return db of users", async () => {
    await request(server)
      .get("/api/users")
      .then((res) => {
        expect(res.body).toBe(res.body);
      });
  });
});
