import axios from "axios"
import { ILeague } from "./models/League"

export async function fetchLeagueData(): Promise<ILeague | null> {
  try {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    let seasonYear
    if (currentMonth >= 8) {
      seasonYear = currentYear
    } else {
      seasonYear = currentYear - 1
    }
    const response = await axios.get<ILeague>(
      `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${seasonYear}&sort=asc`
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
