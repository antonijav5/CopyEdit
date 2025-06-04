import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../store/state';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<{ taskId: string; title: string }>();

  isEditing = false;
  editTitle = '';

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.task.title;
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.updateTask.emit({ taskId: this.task.id, title: this.editTitle.trim() });
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
  }

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }

  getPriorityClass(): string {
    if (!this.task.priority) return '';
    return `priority-${this.task.priority.toLowerCase()}`;
  }
}