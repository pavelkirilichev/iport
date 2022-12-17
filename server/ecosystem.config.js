module.exports = {
  apps: [
    {
      name: 'iport',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      env: {
        NODE_ENV: "production"
      },
      args: ['start', '-p', '12537']
    }
  ]
}