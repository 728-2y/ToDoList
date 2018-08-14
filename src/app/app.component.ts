import { Component, ViewChild } from '@angular/core';
import { TodoList } from './todolist';
import { DoneComponent } from './done/done.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DoneComponent) addDoneList: DoneComponent;
  title = 'todolist';
  doingde: TodoList;
  doneEvent(index) {
      this.doingde = index;
      this.addDoneList.addDoneList(index);
  }
}
