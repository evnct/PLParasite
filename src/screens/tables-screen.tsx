import React, { useEffect, useState } from "react";
import { View } from "native-base";
import { fetchLeagueData } from "../api";
import { ILeague } from "../models/League";
import Loader from "../components/loader";
import ListingTable from "../components/list-table";
import theme from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TablesScreen() {
  const [leagueData, setLeagueData] = useState<ILeague | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchLeagueData();
      setLeagueData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return leagueData ? (
    <View backgroundColor={theme.colors.white[1]} flex={1}>
      <SafeAreaView>
        <ListingTable leagueData={leagueData} />
      </SafeAreaView>
    </View>
  ) : (
    <Loader />
  );
}
