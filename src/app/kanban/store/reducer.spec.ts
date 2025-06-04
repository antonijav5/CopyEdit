import { kanbanReducer } from './reducer';
import { initialState, KanbanState } from './state';
import * as KanbanActions from './actions';

describe('KanbanReducer', () => {
  
  describe('addTask action', () => {
    it('should add a new task to the state', () => {
      const action = KanbanActions.addTask({ title: 'Test Task' });
      const result = kanbanReducer(initialState, action);

      expect(result.tasks.length).toBe(1);
      expect(result.tasks[0].title).toBe('Test Task');
      expect(result.tasks[0].status).toBe('todo');
      expect(result.tasks[0].loadingPriority).toBe(false);
      expect(result.tasks[0].id).toBeDefined();
    });

    it('should not mutate the original state', () => {
      const action = KanbanActions.addTask({ title: 'Test Task' });
      const result = kanbanReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(initialState.tasks.length).toBe(0);
    });
  });

  describe('updateTaskStatus action', () => {
    it('should update task status correctly', () => {
      const initialStateWithTask: KanbanState = {
        tasks: [{
          id: 'test-id-1',
          title: 'Test Task',
          status: 'todo',
          loadingPriority: false
        }]
      };

      const action = KanbanActions.updateTaskStatus({ 
        taskId: 'test-id-1', 
        status: 'in-progress' 
      });
      const result = kanbanReducer(initialStateWithTask, action);

      expect(result.tasks[0].status).toBe('in-progress');
      expect(result.tasks[0].title).toBe('Test Task'); // Other properties unchanged
    });

    it('should not affect other tasks', () => {
      const initialStateWithTasks: KanbanState = {
        tasks: [
          {
            id: 'test-id-1',
            title: 'Task 1',
            status: 'todo',
            loadingPriority: false
          },
          {
            id: 'test-id-2', 
            title: 'Task 2',
            status: 'todo',
            loadingPriority: false
          }
        ]
      };

      const action = KanbanActions.updateTaskStatus({ 
        taskId: 'test-id-1', 
        status: 'done' 
      });
      const result = kanbanReducer(initialStateWithTasks, action);

      expect(result.tasks[0].status).toBe('done');
      expect(result.tasks[1].status).toBe('todo'); // Unchanged
    });
  });

  describe('deleteTask action', () => {
    it('should remove task from state', () => {
      const initialStateWithTask: KanbanState = {
        tasks: [{
          id: 'test-id-1',
          title: 'Test Task',
          status: 'todo',
          loadingPriority: false
        }]
      };

      const action = KanbanActions.deleteTask({ taskId: 'test-id-1' });
      const result = kanbanReducer(initialStateWithTask, action);

      expect(result.tasks.length).toBe(0);
    });
  });

  describe('fetchPriority actions', () => {
    it('should set loading state when fetching priority', () => {
      const initialStateWithTask: KanbanState = {
        tasks: [{
          id: 'test-id-1',
          title: 'Test Task',
          status: 'todo',
          loadingPriority: false,
          errorPriority: 'Previous error'
        }]
      };

      const action = KanbanActions.fetchPriority({ taskId: 'test-id-1' });
      const result = kanbanReducer(initialStateWithTask, action);

      expect(result.tasks[0].loadingPriority).toBe(true);
      expect(result.tasks[0].errorPriority).toBeUndefined();
    });

    it('should set priority on success', () => {
      const initialStateWithTask: KanbanState = {
        tasks: [{
          id: 'test-id-1',
          title: 'Test Task',
          status: 'todo',
          loadingPriority: true
        }]
      };

      const action = KanbanActions.fetchPrioritySuccess({ 
        taskId: 'test-id-1', 
        priority: 'High' 
      });
      const result = kanbanReducer(initialStateWithTask, action);

      expect(result.tasks[0].priority).toBe('High');
      expect(result.tasks[0].loadingPriority).toBe(false);
      expect(result.tasks[0].errorPriority).toBeUndefined();
    });

    it('should set error on failure', () => {
      const initialStateWithTask: KanbanState = {
        tasks: [{
          id: 'test-id-1',
          title: 'Test Task',
          status: 'todo',
          loadingPriority: true
        }]
      };

      const action = KanbanActions.fetchPriorityFailure({ 
        taskId: 'test-id-1', 
        error: 'Network error' 
      });
      const result = kanbanReducer(initialStateWithTask, action);

      expect(result.tasks[0].loadingPriority).toBe(false);
      expect(result.tasks[0].errorPriority).toBe('Network error');
      expect(result.tasks[0].priority).toBeUndefined();
    });
  });
});