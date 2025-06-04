import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { first, Observable } from 'rxjs';
import { Task } from '../../store/state';
import * as KanbanActions from '../../store/actions';
import * as KanbanSelectors from '../../store/selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    TaskCardComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],

})
export class BoardComponent implements OnInit {
  todoTasks$: Observable<Task[]>;
  inProgressTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;

  newTaskTitle = '';

  columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'done', title: 'Done', status: 'done' as const }
  ];

  constructor(private store: Store) {
    this.todoTasks$ = this.store.select(KanbanSelectors.selectTasksByStatus('todo'));
    this.inProgressTasks$ = this.store.select(KanbanSelectors.selectTasksByStatus('in-progress'));
    this.doneTasks$ = this.store.select(KanbanSelectors.selectTasksByStatus('done'));
  }

  ngOnInit(): void {
   }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.store.dispatch(KanbanActions.addTask({ title: this.newTaskTitle.trim() }));
      this.newTaskTitle = '';

      this.todoTasks$
        .pipe(first())
        .subscribe(tasks => {
          const latestTask = tasks[tasks.length - 1];
          if (latestTask && !latestTask.priority && !latestTask.loadingPriority) {
            this.store.dispatch(KanbanActions.fetchPriority({ taskId: latestTask.id }));
          }
        });
    }
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = this.getStatusFromContainerId(event.container.id);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.store.dispatch(KanbanActions.updateTaskStatus({
        taskId: task.id,
        status: newStatus
      }));
    }
  }

  updateTask(event: { taskId: string; title: string }): void {
    this.store.dispatch(KanbanActions.updateTask(event));
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(KanbanActions.deleteTask({ taskId }));
  }

  private getStatusFromContainerId(containerId: string): 'todo' | 'in-progress' | 'done' {
    switch (containerId) {
      case 'todo-list': return 'todo';
      case 'in-progress-list': return 'in-progress';
      case 'done-list': return 'done';
      default: return 'todo';
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}