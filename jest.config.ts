import { JestConfigWithTsJest } from "ts-jest";


const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/test/__mock__/styleMock.ts",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    "@/(.*)$": "<rootDir>/src/$1",

  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest", {
        useESM: true
      }
    ]
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"]
};


export default config;