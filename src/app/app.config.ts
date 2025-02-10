import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "todo-list-aeef0", appId: "1:641379799090:web:e16226c25de3e0cbfaac2b", storageBucket: "todo-list-aeef0.firebasestorage.app", apiKey: "AIzaSyBqDYJqlh-WhFb2ZM2g2PPHisSMVkdihSc", authDomain: "todo-list-aeef0.firebaseapp.com", messagingSenderId: "641379799090", measurementId: "G-P6ENQTLC10" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
