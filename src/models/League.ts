import { IStanding } from './Standing';

export interface ILeague {
    status: boolean;
    data: {
        name: string;
        abbreviation: string;
        seasonDisplay: string;
        season: number;
        standings: IStanding[];
    };
}