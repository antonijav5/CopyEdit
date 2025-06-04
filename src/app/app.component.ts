import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './kanban/components/board/board.component';
import { KanbanService } from './kanban/services/kanban.service';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'CopyEdit';
}
