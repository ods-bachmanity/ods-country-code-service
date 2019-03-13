module.exports = {
  apps : [{
    name: "ccs",
    script: "./index.js",
    instances: -1,
    log: "/var/log/country-code-service/app/app.log",
    merge_logs: true,
    log_type: "json",
    env: {
      NODE_ENV: "production"
    }
  }]
}