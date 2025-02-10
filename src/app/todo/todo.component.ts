import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TodoComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  newTask = '';
  userId: string | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {
    this.authSubscription = this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log('User logged in:', user);

        this.tasks = JSON.parse(localStorage.getItem(`tasks-${this.userId}`) || '[]');
      } else {
        console.log('No user logged in');
        this.userId = null;
      }
    });
  }

  addTask() {
    if (!this.newTask.trim() || !this.userId) return;

    const newTaskObj = {
      id: Date.now().toString(),
      text: this.newTask,
      completed: false,
    };

    this.tasks.push(newTaskObj);
    this.saveTasks();

    this.newTask = '';
    console.log('Task added:', newTaskObj);
  }

  deleteTask(id: string) {
    if (!this.userId) return;

    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();

    console.log('Task deleted:', id);
  }

  toggleComplete(id: string) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  saveTasks() {
    if (this.userId) {
      localStorage.setItem(`tasks-${this.userId}`, JSON.stringify(this.tasks));
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
