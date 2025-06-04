import { TestBed } from '@angular/core/testing';
import { KanbanService } from './kanban.service';

describe('KanbanService', () => {
  let service: KanbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a priority observable', (done) => {
    const taskId = 'test-task-1';
    
    service.getPriority(taskId).subscribe(priority => {
      expect(['High', 'Medium', 'Low']).toContain(priority);
      done();
    });
  });

  it('should simulate delay', (done) => {
    const startTime = Date.now();
    
    service.getPriority('test-task').subscribe(() => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeGreaterThanOrEqual(450); 
      done();
    });
  });
});