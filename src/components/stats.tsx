import React from "react";
import { IStanding } from "../models/Standing";
import { Box, Text, HStack, Center } from "native-base";
import theme from "../theme";

export default function Stats({ selectedTeamData, } : { selectedTeamData: IStanding }) {
  const getName = (name: string) => {
    return name === "gamesPlayed" ? "matches" : name;
  };

  const order = ["points", "gamesPlayed", "wins", "losses", "ties"];
  const filteredStats = selectedTeamData.stats
    .filter((stat) => order.includes(stat.name))
    .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  return (
    <Center>
      {filteredStats.map((stat) => (
        <Box key={stat.description} p="2" borderRadius={15} w={'56'} mt="2">
        <HStack alignItems={"center"} justifyItems={"center"} space={"lg"}>
          <Box
            borderColor={theme.colors.purple[1]}
            borderWidth={2}
            borderRadius={"md"}
            w={16}
            p="1"
            alignItems={"center"}
            justifyContent={"center"}
          >
              <Text
                fontSize={28}
                fontWeight="extrabold"
                fontStyle="italic"
                color={theme.colors.darkText[1]}
              >
                {getName(stat.value.toString())}
              </Text>
            </Box>
            <Text fontSize={28} fontWeight={"medium"} color={theme.colors.darkText[1]}>
              {getName(stat.name).charAt(0).toUpperCase() +
                getName(stat.name).slice(1)}
            </Text>
          </HStack>
        </Box>
      ))}
    </Center>
  );
}
