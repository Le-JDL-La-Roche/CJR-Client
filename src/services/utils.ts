class Utils {
  readonly map = {
    short: {
      C: 'COL',
      L: 'LYC'
    },
    long: {
      C: 'Collège',
      L: 'Lycée'
    }
  }

  sleep(duration: number) {
    return new Promise((resolve) => setTimeout(resolve, duration))
  }
}

export default new Utils()
