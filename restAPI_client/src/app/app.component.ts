import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  restItems: any;
  selectedItems: any;
  restItemsUrl = 'http://localhost:8081/directory';
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    document.getElementById("select").style.display = "none";
    document.getElementById("file").style.display = "none";
    document.getElementById('attribute-list').style.display = "none";
    document.getElementById('error').style.display = "none";
    console.log("file read error");
  }

  public onClick(event) {
    let Directory = document.querySelector('input').value;
    this.restItemsUrl = 'http://localhost:8081/directory?dir='+Directory;
    
    document.getElementById("select").style.display = "none";
    document.getElementById("file").style.display = "none";
    document.getElementById('attribute-list').style.display = "none";
    document.getElementById('error').style.display = "none";
    
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
          
          if(this.restItems.filename === "error"){
            document.getElementById("select").style.display = "none";
            document.getElementById("file").style.display = "none";
            document.getElementById('attribute-list').style.display = "none";
            document.getElementById('error').style.display = "inline";
          }else{
            document.getElementById("select").style.display = "inline";
            document.getElementById("file").style.display = "block";
            document.getElementById('error').style.display = "none";
          }

          var options = "";
          var key = ""
          for(key in this.restItems){
            options += "<option>"+ this.restItems[key].filename +"</option>";
          }
          document.getElementById("file").innerHTML = options;
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  public getOption(selected){
    var key = "";
    for(key in this.restItems){
      if(this.restItems[key].filename == selected){
        this.selectedItems = this.restItems[key];
        
        document.getElementById('attribute-list').style.display = "inline";

        document.getElementById('attribute-list').innerHTML = ''
          for (var att in this.selectedItems) {
            document.getElementById('attribute-list').innerHTML += '<li>' + att + " : " +this.selectedItems[att]+ '</li>';
          }
      }
    }
  }
}







