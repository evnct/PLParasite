import axios from 'axios';
import { ILeague } from './models/League';

export async function fetchLeagueData():Promise<ILeague | null> {
    try {
        const response = await axios.get<ILeague>('https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2022&sort=asc');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}