import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RobotService} from '../../../global/services/robot.service';
import {Robot} from '../../../global/models/robot.model';

@Component({
  selector: 'app-robot-detail',
  templateUrl: './robot-detail.component.html',
  styleUrls: [ './robot-detail.component.css' ]
})
export class RobotDetailComponent implements OnInit, OnDestroy {
  robot$: Observable<Robot>;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRobot();

    this.form = this.fb.group({
        id: [{value: '', disabled: true}],
        name: ['', [Validators.required, Validators.minLength(3)]],
        weight: ['', [Validators.required, Validators.min(20), Validators.max(6000)]],
        height: ['', [Validators.required, Validators.min(0.7), Validators.max(200)]],
        efficiency: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  ngOnDestroy(): void {
  }

  getRobot(): void {
    this.robot$ = this.route.params
        .pipe(
            switchMap( params => this.robotService.getItem(+params.id) ),
            tap(robot => this.form.setValue({
                id: robot.id,
                name: robot.name,
                weight: robot.weight,
                height: robot.height,
                efficiency: robot.efficiency,
            })),
        );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.form.valid){
        const formValue = this.form.getRawValue();
        this.robotService.update(formValue)
          .subscribe(() => this.goBack());
    }
  }
}
