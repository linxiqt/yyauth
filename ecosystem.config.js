module.exports = {
    apps: [
      {
        name: 'jauth',
        port: '6768',
        exec_mode: 'cluster',
        instances: 'auto',
        script: './server/index.mjs'
      }
    ]
  }
  