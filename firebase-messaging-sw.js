// firebase-messaging-sw.js
// Service Worker para notificaciones push — PM Digital

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCqgodGSR4j71ZHmbVkseZ_-RSOZ_wYlXM",
  authDomain: "perito-digital.firebaseapp.com",
  projectId: "perito-digital",
  storageBucket: "perito-digital.firebasestorage.app",
  messagingSenderId: "799762529126",
  appId: "1:799762529126:web:d9dd8867c7f28d2c33a6a7"
});

const messaging = firebase.messaging();

// Notificación cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || 'PM Digital';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: 'https://secundarioperitomorenosecu.github.io/peritodigital/icons/icon-192.png',
    badge: 'https://secundarioperitomorenosecu.github.io/peritodigital/icons/icon-72.png',
    vibrate: [200, 100, 200],
    requireInteraction: false
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Click en la notificación → abrir la app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes('peritodigital') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://secundarioperitomorenosecu.github.io/peritodigital/');
      }
    })
  );
});
