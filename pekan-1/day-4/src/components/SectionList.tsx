import { useState } from "react";
import { RefreshControl, SectionList, Text, View } from "react-native";

export default function MySectionList() {
    const data = [
        { title: 'Buah', data: ['Apel', 'Mangga', 'Jeruk']},
        { title: 'Sayur', data: ['Wortel', 'Kubis', 'Sawi']},
    ]

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {setRefreshing(false)}, 1500)
    }

    return (
        <>
            <SectionList 
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <Text style={{ paddingLeft: 20 }}>{item}</Text>
                )}
                renderSectionHeader={({section}) => (
                    <View style={{ backgroundColor: '#ddd', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold'}}>{section.title}</Text>
                    </View>
                )}
                stickySectionHeadersEnabled={true}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        title="Memuat..."
                        tintColor="blue"
                        colors={['blue', 'red']}
                    />
                }
            />
        </>
    )
}