import { StackNavigator } from 'react-navigation'
import HelloScreen from './screens/HelloScreen'
import MainScreen from './screens/MainScreen'

export default StackNavigator({
    Hello: { screen: HelloScreen },
    Main: { screen: MainScreen }
}, {
    initialRouteName: 'Hello',
})
