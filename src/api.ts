import axios, { Axios, AxiosError } from "axios"
import { ILeague } from "./models/League"

export async function fetchLeagueData(): Promise<ILeague | null> {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  let data
  try {
    data = await fetchStandingData(currentYear)
    return data
  } catch (error) {
    console.error(error)
    const errorMessage = `Standings data not available for this ${currentYear} season`
    if (
      (
        (error as AxiosError).response?.data as {
          data: string
          status: boolean
        }
      ).data.includes(errorMessage)
    ) {
      try {
        data = await fetchStandingData(currentYear - 1)
        return data
      } catch (error) {
        console.error(error)
      }
    }
    return null
  }
}
const fetchStandingData = async (year: number) => {
  return axios
    .get(
      `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${year}&sort=asc`
    )
    .then((res) => res.data)
}
