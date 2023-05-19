import axios, { AxiosError } from "axios"
import { ILeague } from "./models/League"

export async function fetchLeagueData(): Promise<ILeague | null> {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1

  const currentYear = currentDate.getFullYear()
  if (currentMonth < 8) {
    try {
      const response = await axios.get<ILeague>(
        `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${
          currentYear - 1
        }&sort=asc`
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  } else if (currentMonth >= 10) {
    try {
      const response = await axios.get<ILeague>(
        `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${currentYear}&sort=asc`
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      const response = await axios.get<ILeague>(
        `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${currentYear}&sort=asc`
      )
      return response.data
    } catch (error: any) {
      if (
        error?.response?.data?.data?.includes(
          "Standings data not available for this"
        )
      ) {
        try {
          const response = await axios.get<ILeague>(
            `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${
              currentYear - 1
            }&sort=asc`
          )
          return response.data
        } catch (error) {
          console.error(error)
        }
      }
      console.error(error)
    }
  }
  return null
}
