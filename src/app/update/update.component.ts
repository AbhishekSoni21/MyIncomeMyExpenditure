import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  constructor(private router:Router){

  }
  ngOnInit(): void {
    const  checkAccess =  prompt("Enter password to unlock admin feature")
    if(checkAccess===null){
      alert('Action cancelled, redirecting to dashboard.')
      this.router.navigate(['./dashboard'])
    }
    
  }
}
