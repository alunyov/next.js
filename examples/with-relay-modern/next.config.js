module.exports = {
  compiler: {
    relay: {
      src: './',
      artifactDirectory: './__generated__',
    },
    externalDir: true,
  },
  experimental: {
    concurrentFeatures: true,
  },
}
