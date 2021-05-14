import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { MonsterService } from 'src/app/services/monster.service';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: []
})

export class AddMonsterComponent implements OnInit {
    form: FormGroup;
    index$: Observable<{bodyIndex: number; weightStatus: string}>;
    
    constructor(
        private monsterService: MonsterService, 
        private formBuilder: FormBuilder,
        private router: Router
    ){}
    
    ngOnInit(){
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            weight: ['', [Validators.required, Validators.min(20), Validators.max(6000)]],
            height: ['', [Validators.required, Validators.min(0.7), Validators.max(20)]]
        });
        
        const formWeight = this.form.get('weight');
        const formHeight = this.form.get('height');
        
        this.index$ = combineLatest([formWeight.valueChanges, formHeight.valueChanges]).pipe(
            debounceTime(250),
            filter(() => formWeight.valid && formHeight.valid),
            map(value => {
                const bodyIndex = value[0] / Math.pow(value[1], 2);
                let weightStatus = '';
                
                if(bodyIndex < 18.5){
                    weightStatus = 'Piszkafa';
                }else if(bodyIndex < 24.9){
                    weightStatus = 'Normál';
                }else if(bodyIndex < 30){
                    weightStatus = 'Duckó';
                }else{
                    weightStatus = 'Dagadék';
                }
                
                return {bodyIndex, weightStatus};
            })
        );
        
    }
    
    saveMonster(){
        if(this.form.valid){
            const formValue = this.form.value;
            const bodyIndex = formValue.weight / Math.pow(formValue.height, 2);
            
            this.monsterService.addMonster({ ...formValue, bodyIndex, popularity: 0 })
                .subscribe(() => this.router.navigate(['monsters']) );
        }
        
    }
    
}