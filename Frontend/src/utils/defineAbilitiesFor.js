import { defineAbility } from "@casl/ability";

export default (role) =>
  defineAbility((can) => {
    if (role === "admin") {
      can("manage", "all"); // Admin can access any route or resource
    } else {
      can("read", "all"); // Regular users can read all contents but not manage
    }
  });
