export const config = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'citytwin-secret-key-2024',
  CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000',
};
