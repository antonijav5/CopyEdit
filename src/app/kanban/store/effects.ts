import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { KanbanService } from '../services/kanban.service';
import * as KanbanActions from './actions';

@Injectable()
export class KanbanEffects {

    fetchPriority$;

    constructor(
        private actions$: Actions,
        private kanbanService: KanbanService
    ) {
        this.fetchPriority$ = createEffect(() => {

            return this.actions$.pipe(
                ofType(KanbanActions.fetchPriority),
                mergeMap(action =>
                    this.kanbanService.getPriority(action.taskId).pipe(
                        map(priority => {
                            return KanbanActions.fetchPrioritySuccess({
                                taskId: action.taskId,
                                priority
                            });
                        }),
                        catchError(error => {
                            return of(KanbanActions.fetchPriorityFailure({
                                taskId: action.taskId,
                                error: error.message || 'Failed to fetch priority'
                            }));
                        })
                    )
                )
            );
        });
    }
}