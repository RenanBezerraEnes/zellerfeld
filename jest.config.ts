import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@orders/(.*)$': '<rootDir>/src/orders/$1',
    '^@pages/(.*)$': '<rootDir>/src/Pages/$1',
    '^@db/(.*)$': '<rootDir>/src/Mock/DB/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;
