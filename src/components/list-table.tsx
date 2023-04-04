import { VStack, HStack, Text, View } from "native-base";
import { SectionList, Image, RefreshControl } from "react-native";
import { ILeague } from "../models/League";
import theme from "../theme";
import { useState, useCallback } from "react";

const ListingTable = ({ leagueData }: { leagueData: ILeague }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SectionList
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={theme.colors.purple[1]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      sections={[
        {
          data: leagueData.data.standings.map((standing, index) => {
            let points = 0;

            standing.stats.forEach((stat) => {
              switch (stat.name) {
                case "points":
                  points = stat.value;
                  break;
                default:
                  break;
              }
            });

            return {
              key: index,
              value: {
                teamName: standing.team.shortDisplayName,
                teamIcon: standing.team.logos[0].href,
                points: points,
              },
            };
          }),
        },
      ]}
      renderItem={({ item, index }) => (
        <View>
          <VStack p="2">
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Image source={{ uri: item.value.teamIcon, cache: "force-cache" }} style={{ width: 70, height: 70 }} />
                <Text fontSize={24} color={theme.colors.darkText}>{`${index + 1}. ${item.value.teamName}`}</Text>
                <Text fontSize={24} color={theme.colors.darkText}>{" "}{item.value.points} pts{" "}</Text>
              </HStack>
          </VStack>
        </View>
      )}
    />
  );
};

export default ListingTable;
