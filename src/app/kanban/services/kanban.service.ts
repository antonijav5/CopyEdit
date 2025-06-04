import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private priorities: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];

  getPriority(taskId: string): Observable<'High' | 'Medium' | 'Low'> {
    // Mock AI service with random priority assignment
    const randomPriority = this.priorities[Math.floor(Math.random() * this.priorities.length)];
    
    // Simulate network delay and occasional errors
    const shouldError = Math.random() < 0.1; 
    
    if (shouldError) {
      return new Observable(observer => {
        setTimeout(() => {
          observer.error(new Error('AI service temporarily unavailable'));
        }, 500);
      });
    }

    return of(randomPriority).pipe(delay(500));
  }
}