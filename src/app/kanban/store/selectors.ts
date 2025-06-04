import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KanbanState } from './state';

export const selectKanbanState = createFeatureSelector<KanbanState>('kanban');

export const selectAllTasks = createSelector(
    selectKanbanState,
    (state: KanbanState) => state.tasks
);

export const selectTasksByStatus = (status: 'todo' | 'in-progress' | 'done') =>
    createSelector(
        selectAllTasks,
        tasks => tasks.filter(task => task.status === status)
    );

export const selectTaskLoading = (taskId: string) =>
    createSelector(
        selectAllTasks,
        tasks => tasks.find(task => task.id === taskId)?.loadingPriority || false
    );

export const selectTaskById = (taskId: string) =>
    createSelector(
        selectAllTasks,
        tasks => tasks.find(task => task.id === taskId)
    );