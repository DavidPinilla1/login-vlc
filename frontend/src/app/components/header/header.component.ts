import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void { 
  }
  logout() {
    const token = localStorage.getItem('authToken');
    this.userService.logout(token)
      .subscribe(res => console.log(res));
    this.userService.setUser(undefined);
    localStorage.removeItem('authToken');
  }
}
