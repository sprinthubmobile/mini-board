import { TODOS, USERS } from 'src/app/utils/api-constant';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/constant';
import { AppService } from 'src/app/app.service';

interface IUser {
  id: number;
  name: string;
}

class User implements IUser {
  id: number = 0;
  name: string = '';

  constructor(user?: IUser) {
    for (const k in user) if (!!user[k]) this[k] = user[k];
  }
}

interface ITask {
  id: number;
  title: string;
  user: IUser;
  completed: boolean;
  status?: string;
}

class Task implements ITask {
  id: number = 0;
  title: string = '';
  user: IUser = new User();
  completed: boolean = false;
  status?: string = 'incomplete';

  constructor(task?: ITask) {
    for (const k in task) if (!!task[k]) this[k] = task[k];
  }
}

interface IBoard {
  id: number;
  name: string;
  tasks: ITask[];
  actions: string[];
}

class Board implements IBoard {
  id: number = 0;
  name: string = '';
  tasks: ITask[] = [];
  actions: string[] = [];

  constructor(board?: IBoard) {
    for (const k in board) if (!!board[k]) this[k] = board[k];
  }
}

@Component({
  selector: 'mb-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boardsName: string[] = ['Backlog', 'In Progress', 'Done'];
  boards: IBoard[] = this.boardsName.map<IBoard>((name, id, arr) => {
    return new Board({ id, name, tasks: [], actions: arr.filter(n => n !== name) });
  });
  users: IUser[] = [];
  tasks: ITask[] = [];

  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    Promise.resolve(null).then(() => {
      this.appService.pageTitle = 'Boards';
    });
    this.http.get<IUser[]>(`${baseUrl}/users`).subscribe(users => {
      this.users = users.map(u => new User(u));
    }, () => {
      this.users = USERS.map(u => new User(u));
    });
    this.http.get<any[]>(`${baseUrl}/todos`).subscribe(task => {
      this.tasks = task.map(({ userId, id, title, completed }) => new Task({
        id,
        title,
        completed,
        user: this.users.find(u => u.id === userId)
      }));
      this.boards = this.boards.map(b => {
        if (b.name === 'Done') b.tasks = this.tasks.filter(t => t.completed);
        else if (b.name === 'Backlog') b.tasks = this.tasks.filter(t => !t.completed);
        return b;
      });
    }, () => {
      this.tasks = TODOS.map(({ userId, id, title, completed }) => new Task({
        id,
        title,
        completed,
        user: this.users.find(u => u.id === userId)
      }));
      this.boards = this.boards.map(b => {
        if (b.name === 'Done') b.tasks = this.tasks.filter(t => t.completed);
        else if (b.name === 'Backlogs') b.tasks = this.tasks.filter(t => !t.completed);
        return b;
      });
    });
  }

  moveTask(task: ITask, boardId?: number, currentBoard?: IBoard, taskId?: number): void {
    task.completed = this.boards[boardId].name == 'Done';
    this.boards[boardId].tasks.unshift(task);
    currentBoard.tasks.splice(taskId, 1);
  }

}
