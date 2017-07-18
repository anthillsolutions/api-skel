import * as request from "supertest";
import {} from "jest";
import { expect, should } from "chai";
import * as app from "../server/server";

describe("GET /", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).have.property("message");
      });
  });
});
