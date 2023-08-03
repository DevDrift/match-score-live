import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.svg',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'match-score-live';
    private socket: WebSocket | undefined;
    liveData: any;

    constructor() {
        this.connect();
    }

    private connect() {
        this.socket = new WebSocket('ws://localhost:10000/loadouts');
        this.socket.onopen = () => {
            console.log('Connected to server');
        };
        this.socket.onmessage = (event) => {
            this.liveData = JSON.parse(event.data);
        };
        this.socket.onclose = (event) => {
            setTimeout(() => {
                this.connect();
            }, 1000);
        };
        this.socket.onerror = (error) => {};
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        if (this.socket != undefined) {
            this.socket.close();
        }
    }
}
