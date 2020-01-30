import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.sass']
})
export class HomecomponentComponent implements OnInit {
  imgSrc;
  selectedAreas;
  fileUrl
  addAreaForm: FormGroup;
  constructor(private fb: FormBuilder,private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit() {
    var ths = this;
    $.noConflict();
    this.createForm();
  //   this.route.paramMap.subscribe(imgdata => {
  //   //  let date = imgdata;
  //     console.log('route',imgdata); // Print the parameter to the console. 
  //     this.imgSrc = imgdata['params']['id']
      
  // });
  }
  createForm() {
    this.addAreaForm = this.fb.group({
    xVal: [''],
    yVal: [''],
    height: [''],
    width: [''],
    name: ['']  
    });
  }

  openImg() {
    var ths = this;
    $(function ($) {
      $(document).ready(function () {
        $('img#example').selectAreas('destroy');
        $('img#example').selectAreas({
         // minSize: [10, 10],
          onChanged: debugQtyAreas,
          // width: 500,
          // areas: [
          //   {
          //     x: 10,
          //     y: 20,
          //     width: 60,
          //     height: 100,
          //   }
          // ]
        });
        
        $('#btnView').click(function () {
          var areas = $('img#example').selectAreas('areas');
          displayAreas(areas);
        });
        // $('#btnViewRel').click(function () {
        //   var areas = $('img#example').selectAreas('relativeAreas');
        //   displayAreas(areas);
        // });
        // $('#btnReset').click(function () {
        //   output("reset")
        //   $('img#example').selectAreas('reset');
        // });
        // $('#btnDestroy').click(function () {
        //   $('img#example').selectAreas('destroy');

        //   output("destroyed")
        //   $('.actionOn').attr("disabled", "disabled");
        //   $('.actionOff').removeAttr("disabled")
        // });
        // $('#btnCreate').attr("disabled", "disabled").click(function () {
        //   $('img#example').selectAreas({
        //     minSize: [10, 10],
        //     onChanged: debugQtyAreas,
        //     width: 500,
        //   });

        //   output("created")
        //   $('.actionOff').attr("disabled", "disabled");
        //   $('.actionOn').removeAttr("disabled")
        // });
        // $('#btnNew').click(function () {
        //   var areaOptions = {
        //     x: Math.floor((Math.random() * 200)),
        //     y: Math.floor((Math.random() * 200)),
        //     width: Math.floor((Math.random() * 100)) + 50,
        //     height: Math.floor((Math.random() * 100)) + 20,
        //   };
        //   output("Add a new area: " + areaToString(areaOptions))
        //   $('img#example').selectAreas('add', areaOptions);
        // });
        // $('#btnNews').click(function () {
        //   var areaOption1 = {
        //     x: Math.floor((Math.random() * 200)),
        //     y: Math.floor((Math.random() * 200)),
        //     width: Math.floor((Math.random() * 100)) + 50,
        //     height: Math.floor((Math.random() * 100)) + 20,
        //   }, areaOption2 = {
        //     x: areaOption1.x + areaOption1.width + 10,
        //     y: areaOption1.y + areaOption1.height - 20,
        //     width: 50,
        //     height: 20,
        //   };
        //    output("Add a new area: " + areaToString(areaOption1) + " and " + areaToString(areaOption2))
        //     $('img#example').selectAreas('add', [areaOption1, areaOption2]);
        //  });
      }
      );
    });
    var selectionExists;

    function areaToString(area) {
      return (typeof area.id === "undefined" ? "" : (area.id + ": ")) + area.x + ':' + area.y + ' ' + area.width + 'x' + area.height + '<br />'
    }

    function output(text) {

      $('#output').html(text);
    }

    // Log the quantity of selections
    function debugQtyAreas(event, id, areas) {
      //() => {
        // let i = id+1;
        // areas[id].name = 'crop'+ i;
        ths.selectedAreas = areas;
       // ths.setAreaVal(areas)
      //}
      
      
    };

   // Display areas coordinates in a div
    function displayAreas(areas) {
      this.areaVal = areas;
      var text = "";
      $.each(areas, function (id, area) {
        text += areaToString(area);
      });
      output(text);
    };
  }

  setAreaVal(areas){
    console.log();
    this.selectedAreas = areas
  }
  selectImg(event) {
    
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(file);
    }
    setTimeout(() => {
      this.openImg();
    }, 500);
    
  }
  openInput() {
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }

  areaName(index,name){
    this.selectedAreas[index].name= name
  }
  download(){
     const data = JSON.stringify(this.selectedAreas);
     const blob = new Blob([data], { type: 'text/plain' });
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    // const blob = new Blob([JSON.stringify(this.selectedAreas)], { type: 'text/plain' });
    // const url= window.URL.createObjectURL(blob);
    // window.open(url);
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "selectedAreas";
    // start download
    a.click();
  }
}
