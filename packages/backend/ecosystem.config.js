module.exports = {
  apps: [
    {
      name: "blog-backend",
      script: "index.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
      },
    },
  ],
};
