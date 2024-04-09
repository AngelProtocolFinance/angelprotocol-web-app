import { describe, expect, test } from "vitest";
import { flatten } from "./flatten";

describe("flatten", () => {
  test("empty values not included in result", () => {
    const object = {
      name: "Jane Doe",
      address: {},
      list: [],
    };
    const flat = flatten(object);
    expect(flat).toEqual({ name: "Jane Doe" });
  });

  test("full path and value", () => {
    const object = {
      name: "James Bond",
      age: 70,
      friends: [
        {
          name: "Jane Doe",
          age: 31,
          favorites: [1, 2, 3],
          hates: [],
        },
        {
          name: "John Doe",
          age: 30,
          favorites: [],
          hates: [{ name: "Jane Doe", age: 31 }],
        },
      ],
    };
    const flat = flatten(object);
    expect(flat).toEqual({
      name: "James Bond",
      age: 70,
      "friends.0.name": "Jane Doe",
      "friends.0.age": 31,
      "friends.0.favorites.0": 1,
      "friends.0.favorites.1": 2,
      "friends.0.favorites.2": 3,
      "friends.1.name": "John Doe",
      "friends.1.age": 30,
      "friends.1.hates.0.name": "Jane Doe",
      "friends.1.hates.0.age": 31,
    });
  });
});
