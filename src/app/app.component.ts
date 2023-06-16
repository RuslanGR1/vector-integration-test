import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vectorUsername = '';
  vectorPassword = '';
  vectorUrl = 'https://stagevectorapi.edgeestimator.com';
  tenantId = 'd1372053-e8c4-ed11-9109-ac1f6b0a9f7b';

  access_token = '';

  constructor(private readonly http: HttpClient) {}

  async onLoginClick(): Promise<void> {
    const vectorBase = 'https://stagevectorapi.edgeestimator.com';
    const loginUrl = `${vectorBase}/Token`;

    let body = new URLSearchParams();
    body.set('username', this.vectorUsername);
    body.set('password', this.vectorPassword);
    body.set('grant_type', 'password');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const response = await this.http.post<{ access_token: string }>(loginUrl, body.toString(), options).toPromise();
    if (!response) {
      return;
    }
    this.access_token = response.access_token;

    this.getBidList();
  }

  async getBidList(): Promise<void> {
    const url = `https://stagevectorapi.edgeestimator.com/api/bidprep/list/d1372053-e8c4-ed11-9109-ac1f6b0a9f7b`;
    let options = {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.access_token}`)
    };

    const response = await this.http.post(url, undefined, options).toPromise();
    console.log('response', response);
  }
}
