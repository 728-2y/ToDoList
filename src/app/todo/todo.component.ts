import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, AbstractFormGroupDirective, Validators } from '@angular/forms';
import { TodoList, TodoLists } from '../todolist';
import { TodolistService } from '../todolist.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})



export class TodoComponent implements OnInit {
  @Output() doneList = new EventEmitter<TodoList>();
  addLoading = false;
  todoForm: FormGroup;
  todoLists: TodoList[];

  constructor(private fb: FormBuilder, private todolistService: TodolistService) {
    this.createFrom();
    this.getTodoLists();
  }

  createFrom() {
    this.todoForm = this.fb.group({
      id: new Date().toJSON().substring(17, 25),
      title: ['', Validators.required],
      todo: ['', Validators.required],
      isTodo: false
    });
  }

  ngOnInit() {
  }

  getTodoLists() {
    this.todolistService.getHttpTodoLists().subscribe(todo => this.todoLists = todo.filter(isto => isto.isTodo === false));
  }

  isReactice() {
    if (this.addLoading === true) {
      this.addLoading = false;
    } else {
      this.addLoading = true;
    }
  }

  addTodo() {
    const addto: TodoList = this.todoForm.value;
    this.todoLists.push(addto);
    //  this.todolistService.addHttpTodoList(addto).subscribe(result => console.log(result));  // error: 404
    console.log(addto);
    this.createFrom();
  }

  deleteTodo(todolist: TodoList) {
    this.todoLists = this.todoLists.filter(t => t !== todolist);
  }

  DoneEvent(todolist: TodoList) {
    this.todoLists = this.todoLists.filter(t => t !== todolist);
    todolist.isTodo = true;
    this.doneList.emit(todolist);
  }
}
