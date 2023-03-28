import { VStack, Box, HStack, Text, View } from "native-base";
import { SectionList, Image, RefreshControl } from "react-native";
import { ILeague } from '../models/League';
import theme from "../theme";
import { useState, useCallback } from "react";

const changeBorderColorBasedOnRank = (index: number) => {
    switch (index) {
        case 0:
            return theme.colors.first[400];
        case 1:
            return theme.colors.second[400];
        case 2:
            return theme.colors.third[400];
        default:
            return 'white';
    }
}

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
            scrollsToTop={true}
            refreshControl={
                <RefreshControl progressBackgroundColor={'white'} tintColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />
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
                            key: index, value: {
                                teamName: standing.team.shortDisplayName,
                                teamIcon: standing.team.logos[0].href,
                                points: points,
                            }
                        };
                    })
                }
            ]}
            renderItem={({ item, index }) => (
                <View>
                    <VStack p='2'>
                        <Box borderWidth={4} borderRadius={15} p='1.5'
                            borderColor={changeBorderColorBasedOnRank(index)}>
                            <HStack alignItems={'center'} justifyItems={'center'} justifyContent={'space-evenly'}>
                                <Box bg={theme.colors.iconbg[400]} borderRadius={'full'} p='1'>
                                    <Image source={{
                                        uri: item.value.teamIcon,
                                        cache: 'force-cache',
                                    }} style={{ width: 60, height: 60 }} />
                                </Box>
                                <Text fontSize={24}>{`${index + 1}. ${item.value.teamName}`}</Text>
                                <Text fontSize={24}> {item.value.points} pts </Text>
                            </HStack>
                        </Box>
                    </VStack>
                </View>
            )}
        />
    )
}

export default ListingTable;