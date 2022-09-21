import { Pilot } from "./pilot.models";

export interface Car{
    numberCar: number,
    color: string,
    pilot?: Pilot,
    distanceTravel: number,
    status: string,
    start(): void,
    updateDistance(distance: number): void,
    stop(): void
}