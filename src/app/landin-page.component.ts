import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landin-page',
  template: ` <div class="page-holder bg-cover"></div> `,
  styles: [
    `
      .page-holder {
        min-height: 65vh;
      }

      .bg-cover {
        /* background-size: cover; */
        background: url('https://brightnok.com/UPLOADS/Slider/2/Brightnok2000800-1.jpg')
          fixed;
        background-size: contain;
      }
    `,
  ],
})
export class LandinPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
