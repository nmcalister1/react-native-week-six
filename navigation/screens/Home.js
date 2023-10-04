import * as React from 'react'
import { Text, View} from 'react-native';

export function Home({navigation}){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => alert("This is the Home Screen!")} style={{ fontSize: 26, fontWeight: "bold"}}>Home Screen</Text>
        </View>
    )
}