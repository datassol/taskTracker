import {Component} from '@angular/core';
import {DemoService} from './demo.service';
import {Observable} from 'rxjs/Rx';
import {TASK} from './app.model';

@Component({
  selector: 'demo-app',
  templateUrl: './app/taskCreator.html'
})
export class AppComponent {

  public taskDetail:TASK = {};
  public tasks:TASK[];
  public taskName:string;
  public date:Date;
  public assignee:string;

  constructor(private _demoService: DemoService) { }

  ngOnInit() {
    this.getTasks();
    this.getTasks();
  }

  getTasks() {
    this._demoService.getTasks().subscribe(
      data => { this.tasks = data},
      err => console.error(err),
      () => console.log('done loading tasks')
    );
  }

  createTask() {
    //var date = new Date();
    //var date1 = date.toLocaleDateString;
    this.taskDetail = {name: this.taskName, date:new Date(), assignee:this.assignee};
    this._demoService.createTask(this.taskDetail).subscribe(
       data => {
         this.getTasks();
         return true;
       },
       error => {
         console.error("Error saving task!");
         return Observable.throw(error);
       }
    );
  }

}
