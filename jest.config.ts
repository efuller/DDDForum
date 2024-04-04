module.exports = {
  projects: [
    {
      displayName: 'api',
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
      testEnvironment: 'node',
      testMatch: ['**/@(src|tests)/**/*.@(test|spec).@(ts|tsx)'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      rootDir: '<rootDir>/packages/api',
    },
    {
      displayName: 'web',
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      testEnvironment: 'node',
      testMatch: ['**/@(src|tests)/**/*.@(test|spec).@(ts|tsx)'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      rootDir: '<rootDir>/packages/web',
    }
  ]
};
