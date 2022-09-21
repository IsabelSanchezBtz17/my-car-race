import { Car } from "./car.models";

export interface Race{
    cars: Car[],
    laps: number,
    distanceKm: number,
    status: string,
}