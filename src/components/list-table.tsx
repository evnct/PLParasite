import { VStack, Box, HStack, Text, View } from "native-base";
import { SectionList, Image } from "react-native";
import { ILeague } from '../models/League';

const changeBorderColorBasedOnRank = (index: number) => {
    switch (index) {
        case 0:
            return '#FFB649';
        case 1:
            return '#7B61FF';
        case 2:
            return '#E649FF';
        default:
            return 'white';
    }
}

const ListingTable = ({ leagueData }: { leagueData: ILeague }) => {
    return (
        <SectionList scrollEnabled={true} showsVerticalScrollIndicator={false} scrollsToTop={true}
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
                        <Box borderWidth={2} borderRadius={15} p='2'
                            borderColor={changeBorderColorBasedOnRank(index)}>
                            <HStack space={2} alignItems={'center'} justifyItems={'center'}>
                                <Box bg='white' borderRadius={'full'} p='1'>
                                    <Image source={{
                                        uri: item.value.teamIcon,
                                        cache: 'force-cache',
                                    }} style={{ width: 45, height: 45 }} />
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