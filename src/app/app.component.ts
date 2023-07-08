import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //@ts-ignore
  @ViewChild('f', {static: true}) signupForm: NgForm;

  defaultOption = "pet";
  questionAnswer = '';
  genders = ["male", "female", "other"];
  submitted = false;
  user = {
    username: "",
    gender: "",
    email: "",
    question: "",
    answer: ""
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({
      "user-data": {
        username: suggestedName
      }
    });

  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.user.username = form.value["user-data"]["username"];
    this.user.gender = form.value["user-data"]["gender"];
    this.user.email = form.value["user-data"]["email"];
    this.user.question = form.value["secret"];
    this.user.answer = form.value["questionAnswer"];
    form.reset();
  }
}
