import { Injectable } from '@angular/core';
import { TodoList, TodoLists } from './todolist';
import { Observable, of } from 'rxjs';
import { delay, find, filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TodolistService {
  private httpUrl = 'assets/todolist.json';
  delayMs = 500;

  getTodolists(): Observable<TodoList[]> {
    const toLists: TodoList[] = TodoLists.filter(to => to.isTodo === false);
    return of(toLists).pipe(delay(this.delayMs));
  }

  getDoneLists(): Observable<TodoList[]> {
    const donelists: TodoList[] = TodoLists.filter(to => to.isTodo === true);
    return of(donelists).pipe(delay(this.delayMs));
  }

  // http get todolists of json
  getHttpTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.httpUrl).pipe(
      catchError(this.handleError<TodoList[]>('getTodoLists'))
    );
  }

  // http get donelists of json
  getHttpDoneLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.httpUrl).pipe(
      catchError(this.handleError<TodoList[]>('getDoneLists'))
    );
  }

  // http add todolist to json
  addHttpTodoList(todolist: TodoList): Observable<Response> {
    return this.http.post(this.httpUrl, todolist).pipe(
  map((res: Response) => res)
    );
  }
  /** POST: add a new todolist to the server */
  addTodo(todo: TodoList): Observable<TodoList> {
    return this.http.post<TodoList>(this.httpUrl, todo, httpOptions).pipe(

      // tslint:disable-next-line:no-shadowed-variable
      tap((todo: TodoList) => console.log(`added hero w/ id=${todo.id}`)),
      catchError(this.handleError<TodoList>('addHero'))
    );
  }
  constructor(private http: HttpClient) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
