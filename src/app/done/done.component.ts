import { Component, OnInit, Input } from '@angular/core';
import { TodoList, TodoLists } from '../todolist';
import { FormGroup } from '@angular/forms';
import { TodolistService } from '../todolist.service';
import { InvokeFunctionExpr } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  todoForm: FormGroup;
  todoLists: TodoList[];
  constructor(private todolistService: TodolistService) {

    this.getDoneLists();

  }

  ngOnInit() {
  }
  deleteDone(todolist: TodoList) {
    this.todoLists = this.todoLists.filter(t => t !== todolist);
  }

  getDoneLists() {
    this.todolistService.getHttpDoneLists().subscribe(result => this.todoLists = result.filter(done => done.isTodo === true));
  }

  addDoneList(donelist: TodoList) {
    this.todoLists.push(donelist);
  }
}
