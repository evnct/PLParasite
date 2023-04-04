import { Text, View, VStack, Center, Select } from "native-base";
import { Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fetchLeagueData } from "../api";
import { IStanding } from "../models/Standing";
import { ILeague } from "../models/League";
import Loader from "../components/loader";
import Stats from "../components/stats";
import theme from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataScreen() {
  const [leagueData, setLeagueData] = useState<ILeague | null>(null);
  const [selectedTeamData, setSelectedTeamData] = useState<IStanding | null>(
    null
  );
  const [team, setTeam] = useState("");

  const isFirstMount = useRef(true);

  /// Fetching all the teams in the standings list
  const allTeams = async () => {
    try {
      const data = await fetchLeagueData();
      setLeagueData(data);
      // Default team for Select component
      if (data) {
        const selectedTeamData = data.data.standings.filter(
          (standing) => standing.team.displayName === team
        )[0];
        setSelectedTeamData(selectedTeamData);
        // set the team state on the first mount of the component and not on the subsequent renders.
        if (isFirstMount.current) {
          setTeam(data.data.standings[0].team.displayName);
          isFirstMount.current = false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allTeams();
  }, [team]);

  if (!selectedTeamData || !leagueData) {
    return <Loader />;
  }

  const teamLogo = () => (
    <Image source={{ uri: selectedTeamData?.team.logos[0].href, cache: "force-cache" }}
      style={{ width: 100, height: 100, resizeMode: "contain", zIndex: 1 }} />
  );

  return (
    <View backgroundColor={theme.colors.white[1]} flex={1} py='20'>
      <SafeAreaView>
          <Center>
            <VStack space={4} alignItems={"center"} justifyContent="center">
              {teamLogo()}
              <Select
                borderWidth={0}
                shadow={"1"}
                borderRadius={"lg"}
                fontSize={"xl"}
                dropdownIcon={
                  <Text fontSize={"xl"} px={"2"} color={theme.colors.purple[1]}>
                    ▼
                  </Text>
                }
                selectedValue={team}
                color={theme.colors.darkText[1]}
                minWidth="200"
                accessibilityLabel="Choose Team"
                placeholder="Choose Team"
                borderBottomWidth={'2'}
                _selectedItem={{
                  endIcon: (
                    <Text fontSize={"xl"} color={"#FFF"}>
                      ▼
                    </Text>
                  ),
                }}
                onValueChange={(itemValue) => setTeam(itemValue)}
              >
                {/* Listing selectable teams in alphabetical order */}
                {leagueData.data.standings
                  .sort((a, b) =>
                    a.team.shortDisplayName.localeCompare(b.team.displayName)
                  )
                  .map((standing, index) => (
                    <Select.Item
                      key={index}
                      label={standing.team.shortDisplayName}
                      value={standing.team.displayName}
                      fontWeight={"black"}
                    />
                  ))}
              </Select>
                <Stats selectedTeamData={selectedTeamData} />
            </VStack>
          </Center>
      </SafeAreaView>
    </View>
  );
}
