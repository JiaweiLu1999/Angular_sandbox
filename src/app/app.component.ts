import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signupForm: FormGroup = new FormGroup({});
  projectStatus = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectName = ['Test'];
  forbiddenEmail = ['jl5999@columbia.edu'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      "projectName": new FormControl(null, [Validators.required, this.projectNameValidator.bind(this)]),
      "email": new FormControl(null, [Validators.email, Validators.required], this.emailValidator.bind(this)),
      "projectStatus": new FormControl('Stable')
    });
  }



  projectNameValidator(control: FormControl): {[s:string]: boolean} | null {
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return {'projectNameForbidden' : true};
    }
    return null;
  }

  emailValidator(control: AbstractControl): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        setTimeout(()=> {
          if (this.forbiddenEmail.indexOf(control.value) !== -1) {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1000);
      }
    );
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }


}
