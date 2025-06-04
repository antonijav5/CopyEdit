import * as KanbanSelectors from './selectors';
import { KanbanState } from './state';

describe('Kanban Selectors', () => {
  const mockState = {
    kanban: {
      tasks: [
        {
          id: '1',
          title: 'Todo Task',
          status: 'todo' as const,
          loadingPriority: false,
          priority: 'High' as const
        },
        {
          id: '2',
          title: 'In Progress Task',
          status: 'in-progress' as const,
          loadingPriority: true
        },
        {
          id: '3',
          title: 'Done Task',
          status: 'done' as const,
          loadingPriority: false,
          priority: 'Low' as const
        },
        {
          id: '4',
          title: 'Another Todo Task',
          status: 'todo' as const,
          loadingPriority: false
        }
      ]
    }
  };

  describe('selectAllTasks', () => {
    it('should return all tasks', () => {
      const result = KanbanSelectors.selectAllTasks(mockState);
      expect(result.length).toBe(4);
    });

    it('should return empty array for empty state', () => {
      const emptyState = { kanban: { tasks: [] } };
      const result = KanbanSelectors.selectAllTasks(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectTasksByStatus', () => {
    it('should return only todo tasks', () => {
      const todoSelector = KanbanSelectors.selectTasksByStatus('todo');
      const result = todoSelector(mockState);
      
      expect(result.length).toBe(2);
      expect(result.every(task => task.status === 'todo')).toBe(true);
      expect(result.map(task => task.id)).toEqual(['1', '4']);
    });

    it('should return only in-progress tasks', () => {
      const inProgressSelector = KanbanSelectors.selectTasksByStatus('in-progress');
      const result = inProgressSelector(mockState);
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
      expect(result[0].status).toBe('in-progress');
    });

    it('should return only done tasks', () => {
      const doneSelector = KanbanSelectors.selectTasksByStatus('done');
      const result = doneSelector(mockState);
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('3');
      expect(result[0].status).toBe('done');
    });

    it('should return empty array for status with no tasks', () => {
      const emptyState = { kanban: { tasks: [] } };
      const todoSelector = KanbanSelectors.selectTasksByStatus('todo');
      const result = todoSelector(emptyState);
      
      expect(result).toEqual([]);
    });
  });

  describe('selectTaskLoading', () => {
    it('should return true for loading task', () => {
      const loadingSelector = KanbanSelectors.selectTaskLoading('2');
      const result = loadingSelector(mockState);
      
      expect(result).toBe(true);
    });

    it('should return false for non-loading task', () => {
      const loadingSelector = KanbanSelectors.selectTaskLoading('1');
      const result = loadingSelector(mockState);
      
      expect(result).toBe(false);
    });

    it('should return false for non-existent task', () => {
      const loadingSelector = KanbanSelectors.selectTaskLoading('999');
      const result = loadingSelector(mockState);
      
      expect(result).toBe(false);
    });
  });

  describe('selectTaskById', () => {
    it('should return correct task by id', () => {
      const taskSelector = KanbanSelectors.selectTaskById('2');
      const result = taskSelector(mockState);
      
      expect(result).toBeDefined();
      expect(result?.id).toBe('2');
      expect(result?.title).toBe('In Progress Task');
      expect(result?.status).toBe('in-progress');
    });

    it('should return undefined for non-existent task', () => {
      const taskSelector = KanbanSelectors.selectTaskById('999');
      const result = taskSelector(mockState);
      
      expect(result).toBeUndefined();
    });
  });
});