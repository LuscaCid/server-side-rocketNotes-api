module.exports = {
  apps : [{
    name: "app",
    script: "./learning-about-creating-api/src/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }] 
}
