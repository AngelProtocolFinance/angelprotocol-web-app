import { describe, expect, test } from "vitest";
import { UpdateBuilder } from "./update-builder";

describe("UpdateBuilder", () => {
  test("REMOVE operations", () => {
    const builder = new UpdateBuilder().remove("user").remove("age");
    expect(builder.collect()).toEqual({
      UpdateExpression: "REMOVE #user, #age",
      ExpressionAttributeNames: {
        "#user": "user",
        "#age": "age",
      },
    });
  });
  test("SET operations", () => {
    const builder = new UpdateBuilder().set("name", "John").set("age", 30);

    expect(builder.collect()).toEqual({
      UpdateExpression: "SET #name = :name, #age = :age",
      ExpressionAttributeNames: { "#name": "name", "#age": "age" },
      ExpressionAttributeValues: { ":name": "John", ":age": 30 },
    });
  });

  test("nested SET operations", () => {
    const builder = new UpdateBuilder()
      .set("user.profile.name", "John")
      .set("user.profile.age", 30);

    expect(builder.collect()).toEqual({
      UpdateExpression:
        "SET #user.#profile.#name = :user_profile_name, #user.#profile.#age = :user_profile_age",
      ExpressionAttributeNames: {
        "#user": "user",
        "#profile": "profile",
        "#name": "name",
        "#age": "age",
      },
      ExpressionAttributeValues: {
        ":user_profile_name": "John",
        ":user_profile_age": 30,
      },
    });
  });
  test("nested REMOVE operation", () => {
    const builder = new UpdateBuilder().remove("user.profile.oldField");

    expect(builder.collect()).toEqual({
      UpdateExpression: "REMOVE #user.#profile.#oldField",
      ExpressionAttributeNames: {
        "#user": "user",
        "#profile": "profile",
        "#oldField": "oldField",
      },
    });
  });

  test("mixed nested, SET, REMOVE", () => {
    const builder = new UpdateBuilder()
      .set("name", "John")
      .set("details.address.city", "New York")
      .remove("details.address.zip");

    expect(builder.collect()).toEqual({
      UpdateExpression:
        "SET #name = :name, #details.#address.#city = :details_address_city REMOVE #details.#address.#zip",
      ExpressionAttributeNames: {
        "#name": "name",
        "#details": "details",
        "#address": "address",
        "#city": "city",
        "#zip": "zip",
      },
      ExpressionAttributeValues: {
        ":name": "John",
        ":details_address_city": "New York",
      },
    });
  });
});
