// Workaround: tsgo doesn't resolve CacheStorage.default from worker-configuration.d.ts
// because the standard lib's CacheStorage interface takes precedence over the declared abstract class.
// Remove once tsgo reaches parity with tsc.
interface CacheStorage {
  readonly default: Cache
}
