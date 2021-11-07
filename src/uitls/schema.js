const schema = {
  type: "object",
  properties: {
    dir: {
      type: "string",
    },
    output: {
      type: "string",
    },
    port: {
      type: "number",
      // anyOf: [{ type: "array" }, { type: "string" }, { instanceof: "RegExp" }],
    },
    origin: {
      type: "string",
    },
    button: {
      type: "object",
      properties: {
        color: {
          type: "string",
        },
      },
    },
    image: {
      type: "object",
      properties: {
        color: {
          type: "string",
        },
      },
    },
    device: {
      type: "string",
    },
  },
  additionalProperties: false,
};

module.exports = schema;
