declare global {
  const Temporal: typeof import('@js-temporal/polyfill').Temporal
  type Window = {
    Temporal: typeof import('@js-temporal/polyfill').Temporal
  }
}

export {} 