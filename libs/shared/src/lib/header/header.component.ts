import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'streams-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') navbar!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) 
	onScroll(e: Event): void {
		let navbar = (document.getElementById('navbar'));
		let position = (document.documentElement.scrollTop || document.body.scrollTop);
		if(position >= 30){
			this.navbar?.nativeElement.classList.remove('bg-black');
			this.navbar?.nativeElement.classList.add('bg-transparent');
		}else{
			this.navbar?.nativeElement.classList.add('bg-black');
			this.navbar?.nativeElement.classList.remove('bg-transparent');
		}
    console.log('scrolling', position, this.navbar)
	}
}
