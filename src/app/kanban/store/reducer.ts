import { createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { initialState } from './state';
import * as KanbanActions from './actions';

export const kanbanReducer = createReducer(
    initialState,
    on(KanbanActions.addTask, (state, { title }) => ({
        ...state,
        tasks: [
            ...state.tasks,
            {
                id: uuidv4(),
                title,
                status: 'todo' as const,
                loadingPriority: false
            }
        ]
    })),

    on(KanbanActions.updateTask, (state, { taskId, title }) => ({
        ...state,
        tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, title } : task
        )
    })),

    on(KanbanActions.updateTaskStatus, (state, { taskId, status }) => ({
        ...state,
        tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
        )
    })),

    on(KanbanActions.deleteTask, (state, { taskId }) => ({
        ...state,
        tasks: state.tasks.filter(task => task.id !== taskId)
    })),

    on(KanbanActions.fetchPriority, (state, { taskId }) => ({
        ...state,
        tasks: state.tasks.map(task =>
            task.id === taskId
                ? { ...task, loadingPriority: true, errorPriority: undefined }
                : task
        )
    })),

    on(KanbanActions.fetchPrioritySuccess, (state, { taskId, priority }) => ({
        ...state,
        tasks: state.tasks.map(task =>
            task.id === taskId
                ? { ...task, priority, loadingPriority: false, errorPriority: undefined }
                : task
        )
    })),

    on(KanbanActions.fetchPriorityFailure, (state, { taskId, error }) => ({
        ...state,
        tasks: state.tasks.map(task =>
            task.id === taskId
                ? { ...task, loadingPriority: false, errorPriority: error }
                : task
        )
    }))
);