self.addEventListener('push', event => {
  console.log('[Push Service Worker] Push Received:', event);
  let data = { title: 'Notification', body: 'Default body message' };
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body,
    icon: 'assets/icons/icon-192x192.png', // ensure these paths are correct
    badge: 'assets/icons/icon-48x48.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  console.log('[Push Service Worker] Notification click Received.');
  event.notification.close();
  // Optionally, navigate to a specific URL or focus the app:
  event.waitUntil(clients.openWindow('/'));
});
