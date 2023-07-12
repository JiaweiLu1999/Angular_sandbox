import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup = new FormGroup({});
  reservedUsernames = ["Javey"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      "user-data": new FormGroup({
        "username": new FormControl(null, [Validators.required, this.usernameValidate.bind(this)]),
        "email": new FormControl(null, [Validators.required, Validators.email], [this.emailValidate])
      }),
      "gender": new FormControl("male"),
      "hobby": new FormArray([])
    });
    let email = this.signupForm.get("user-data.email");
    if (email) {
      email.statusChanges.subscribe(
        (status) => {
          console.log(status)}
      )
    }

  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get('hobby')).push(new FormControl(null, Validators.required));
    console.log(this.getControls())
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobby')).controls;
  }

  usernameValidate(control: FormControl): {[s: string]: boolean}|null {
    if (this.reservedUsernames.indexOf(control.value) !== -1) {
      return {"nameIsForbidden" : true};
    }
    return null;
  }

  emailValidate(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "jl5999@columbia.edu") {
          resolve({"emailIsForbidden": true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
