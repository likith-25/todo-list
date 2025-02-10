import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { CommonModule } from '@angular/common'; 
import { TodoComponent } from './todo/todo.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, TodoComponent], 
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  user: firebase.User | null = null;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
