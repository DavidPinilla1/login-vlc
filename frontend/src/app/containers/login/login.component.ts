import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.userService.login(loginForm.value)
        .subscribe(res => {
          localStorage.setItem('authToken', res.token);
          this.userService.setUser(res.user);
        });
    }
  }
}
