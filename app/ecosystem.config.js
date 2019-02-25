module.exports = {
    apps : [{
      name: "ccs",
      script: "./index.js",
      instances: 1,
      env: {
        NODE_ENV: "production"
      }
    }]
  }
