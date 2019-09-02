import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { CustomErrorState } from '../../utils/custom-error-state';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new CustomErrorState();

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', []]
    }, {
      validators: (group: FormGroup) => {
        let {password, passwordConfirmation} = group.controls;

        if (password.value !== passwordConfirmation.value
          && passwordConfirmation.dirty
        ) {
          return { notSame: true };
        }

        if (passwordConfirmation.value == "") {
          return { required: true };
        }

        return null;
      }
    });
  }

  ngOnInit() {
  }

  register() {
    const {name, email, password} = this.registerForm.controls;
    const user: User = new User;
    user.name = name.value;
    user.email = email.value;
    user.password = password.value;

    this.authService.register(user);
  }

}
