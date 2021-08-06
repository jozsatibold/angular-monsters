import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RobotSandbox} from '../../../global/sandboxes/robot.sandbox';

@Component({
  selector: 'app-add-robot',
  templateUrl: './add-robot.component.html',
  styleUrls: []
})

export class AddRobotComponent implements OnInit {
    form: FormGroup;

    constructor(
        private robotSandbox: RobotSandbox,
        private formBuilder: FormBuilder,
        private router: Router
    ){}

    ngOnInit(){
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            weight: ['', [Validators.required, Validators.min(20), Validators.max(6000)]],
            height: ['', [Validators.required, Validators.min(0.7), Validators.max(200)]],
            efficiency: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
        });

    }

    saveRobot(){
        if (this.form.valid){
            const formValue = this.form.value;

            this.robotSandbox.add({ ...formValue, popularity: 0 })
                .subscribe(() => this.router.navigate(['robot', 'list']) );
        }
    }
}
