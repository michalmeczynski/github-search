export default {
  coverageDirectory: "../../coverage/apps/proxy",
  displayName: "proxy",
  moduleFileExtensions: ["ts", "js", "html"],
  preset: "../../jest.preset.js",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }]
  }
};
