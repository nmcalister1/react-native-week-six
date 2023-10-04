import * as React from 'react'
import { Text, View, FlatList} from 'react-native';
import { fakeServer } from '../../fakeServer';


const renderItem = ({item}) => (
    <Text style={{textAlign: 'center', fontSize: 30, padding: 5, borderBottomColor: '#DD4124', borderBottomWidth: 2 }}>{item.Title}</Text>
)

let stopFetchMore = true

const ListFooterComponent = () => (
    <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5}}>
        Loading...
    </Text>
)

export function Movies(){
    const [data, setData] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const fetchData = async() => {
        const response = await fakeServer(15)
        setData([...response])
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    const handleOnEndReached = async() => {
        setLoading(true)
        if (!stopFetchMore){
            const response = await fakeServer(15)
            if (response === 'done') return setLoading(false)
            setData([...data, ...response])
            stopFetchMore = true
        }
        setLoading(false)
    }

    
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: "bold"}}>Movie Screen</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.01}
                onScrollBeginDrag={() => {
                    stopFetchMore = false
                }}
                ListFooterComponent={() => loading && <ListFooterComponent/>}
                onRefresh={() => console.log("refreshing")}
                refreshing={false}
            />
        </View>
    )
}