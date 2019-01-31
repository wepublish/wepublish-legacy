import {version} from './version'
export * from './version'

// Tell typescript we're in a ServiceWorker.
declare var self: ServiceWorkerGlobalScope

const cacheKey = `wepublish-cache-v${version}`

async function cacheCoreResources() {
  const cache = await caches.open(cacheKey)
  return cache.addAll(['/', '/static/client.js'])
}

let currentCache: Cache | undefined
async function getCurrentCache() {
  if (currentCache) return currentCache
  currentCache = await caches.open(cacheKey)
  return currentCache
}

async function cleanOldCaches() {
  const cacheKeys = await caches.keys()
  const filteredKeys = cacheKeys.filter(key => key !== cacheKey)

  return Promise.all(filteredKeys.map(key => caches.delete(key)))
}

async function fetchAndCache(e: FetchEvent) {
  const request = e.request

  try {
    const networkResponse = await fetch(e.request)

    if (request.url.startsWith('http') && request.method === 'GET') {
      const cache = await getCurrentCache()
      e.waitUntil(cache.put(request, networkResponse.clone()))
    }

    return networkResponse.clone()
  } catch (err) {
    const cachedResponse = await caches.match(request)
    if (!cachedResponse) throw err

    return cachedResponse
  }
}

export function initialize() {
  self.addEventListener('install', e => {
    console.log(`Installing service worker v${version}`)
    e.waitUntil(cacheCoreResources())
  })

  self.addEventListener('activate', e => {
    console.log(`Activating service worker v${version}`)
    e.waitUntil(cleanOldCaches())
  })

  self.addEventListener('fetch', e => {
    e.respondWith(fetchAndCache(e))
  })
}
