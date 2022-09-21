import { Component } from '@angular/core';
import { Car } from './models/car.models';
import { Pilot } from './models/pilot.models';
import { Race } from './models/race.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-car-race';

  constructor() {

    const PILOT_1: Pilot = {
      id_pilot: 1,
      name: 'Juanito',
      lastName: 'Perez',
      nationality: 'Mexicana'
    }

    const PILOT_2: Pilot = {
      id_pilot: 2,
      name: 'Brian',
      lastName: 'Sout',
      nationality: 'Canadiense'
    }

    const PILOT_3: Pilot = {
      id_pilot: 3,
      name: 'Mickel',
      lastName: 'Pol',
      nationality: 'Francesa'
    }

    const PILOT_4: Pilot = {
      id_pilot: 4,
      name: 'Israel',
      lastName: 'Boold',
      nationality: 'Holandesa'
    }




    function getRandomInt(max: number): number {
      return Math.floor(Math.random() * max) + 1;
    }

    function moveCar(distanceTotal: number, distanciaCar: number): number {
      if (distanciaCar < distanceTotal) {
        return getRandomInt(50);
      }
      return 50;
    }



    let car1: Car = {
      numberCar: 1,
      color: 'rojo',
      distanceTravel: 0,
      pilot: PILOT_1,
      status: 'STOP',
      start() {
        this.status = 'RUN'
        this.updateDistance(1);
      },
      updateDistance(distanceT: number) {
        this.distanceTravel = moveCar(distanceT, this.distanceTravel) + this.distanceTravel;

      },
      stop() {
        this.status = 'STOP'
      },
    }

    let car2: Car = {
      numberCar: 2,
      color: 'azul',
      distanceTravel: 0,
      pilot: PILOT_2,
      status: 'STOP',
      start() {
        this.status = 'RUN'
        this.updateDistance(1);
      },
      updateDistance(distanceT: number) {
        this.distanceTravel = moveCar(distanceT, this.distanceTravel) + this.distanceTravel;
      },
      stop() {
        this.status = 'STOP'
      },
    }

    let car3: Car = {
      numberCar: 3,
      color: 'negro',
      distanceTravel: 0,
      pilot: PILOT_3,
      status: 'STOP',
      start() {
        this.status = 'RUN'
        this.updateDistance(1);
      },
      updateDistance(distanceT: number) {
        this.distanceTravel = moveCar(distanceT, this.distanceTravel) + this.distanceTravel;
      },
      stop() {
        this.status = 'STOP'
      },
    }

    let car4: Car = {
      numberCar: 4,
      color: 'blanco',
      distanceTravel: 0,
      pilot: PILOT_4,
      status: 'STOP',
      start() {
        this.status = 'RUN'
        this.updateDistance(1);
      },
      updateDistance(distanceT: number) {
        this.distanceTravel = moveCar(distanceT, this.distanceTravel) + this.distanceTravel;
      },
      stop() {
        this.status = 'STOP'
      },
    }

    let car5: Car = {
      numberCar: 3,
      color: 'negro',
      distanceTravel: 0,
      status: 'STOP',
      start() {
        this.status = 'RUN'
        this.updateDistance(1);
      },
      updateDistance(distanceT: number) {
        this.distanceTravel = moveCar(distanceT, this.distanceTravel) + this.distanceTravel;
      },
      stop() {
        this.status = 'STOP'
      },
    }


    let race: Race = {
      laps: 2,
      distanceKm: 150,
      status: 'NEW',
      cars: [car1, car2, car3, car4]
    }


    this.startRace(race);

    do {
      this.listPosition(race);
    } while (race.status != 'END');


    const { numberCar: winnerCar, pilot: winnerPilot } = race.cars[0];

    let winner: String = `Datos del ganador:
   Piloto: ${winnerPilot?.name} ${winnerPilot?.lastName}
   Nacionalidad: ${winnerPilot?.nationality}
   Numero de carro:${winnerCar}
   `
    console.log(winner);

  }


  startRace(race: Race): void {
    if (race.status == 'NEW') {
      race.cars.forEach(car => { car.start(); })
      race.status = 'PROCESS';
    }
  }


  updateRace(race: Race): void {

    const DISTANCE_TOTAL: number = race.distanceKm * race.laps;
    let totalCars = 0;

    if (race.status == 'PROCESS') {

      race.cars.forEach(car => {
        car.updateDistance(DISTANCE_TOTAL)
        if (car.distanceTravel >= DISTANCE_TOTAL)
          totalCars++;
      })
      if (race.cars.length == totalCars) {
        race.status = 'END';
      }
    }

  }

  listPosition(race: Race): void {
    let board: any[] = [];
    this.updateRace(race);
    console.log('El status de la carrera es: ' + race.status);

    race.cars.sort(function (a, b) {
      if (a.distanceTravel > b.distanceTravel)
        return -1;
      else if (a.distanceTravel < b.distanceTravel)
        return 1;
      else
        return 0;
    });

    race.cars.forEach((dataCar, index) => {
      let dataCars: any = {
        position: index + 1,
        nationality: dataCar.pilot?.nationality,
        name: dataCar.pilot?.name,
        numberCar: dataCar.numberCar
      }
      board.push(dataCars);
    })

    console.table(board);
  }




}
