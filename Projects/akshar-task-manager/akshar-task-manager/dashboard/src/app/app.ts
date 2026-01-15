import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  token: string | null = null;
  tasks: any[] = [];
  status = '';

  constructor(private http: HttpClient) {}

  login() {
    this.status = 'Logging in...';

    this.http
      .post<any>('http://localhost:3000/api/auth/login', {
        email: 'admin@test.com',
        password: 'password',
      })
      .subscribe({
        next: (res) => {
          this.token = res.accessToken;
          this.status = '✅ Logged in successfully';
        },
        error: (err) => {
          console.error(err);
          this.status = '❌ Login failed';
        },
      });
  }

  loadTasks() {
    console.log('TOKEN:', this.token);
  
    if (!this.token) {
      this.status = '❌ Please login first';
      return;
    }
  
    this.status = 'Loading tasks...';
  
    fetch('http://localhost:3000/api/tasks', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then(res => {
        console.log('TASKS STATUS:', res.status);
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        this.tasks = data;
        this.status = '✅ Tasks loaded';
      })
      .catch(err => {
        this.status = '❌ Failed to load tasks';
        console.error(err);
      });
  }
  

  createTask() {
    if (!this.token) {
      this.status = '❌ Please login first';
      return;
    }

    this.status = 'Creating task...';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http
      .post(
        'http://localhost:3000/api/tasks',
        {
          title: 'Sample Task from UI',
          status: 'OPEN',
          category: 'General',
        },
        { headers }
      )
      .subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.status = '✅ Task created';
        },
        error: (err) => {
          console.error(err);
          this.status = '❌ Failed to create task';
        },
      });
  }

  logout() {
    this.token = null;
    this.tasks = [];
    this.status = 'Logged out';
  }
}
