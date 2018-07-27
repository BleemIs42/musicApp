import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'

export default class Main extends Component {
    static navigationOptions = {
        headerTitle: 'Main',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    }
    render () {
        return <Container>
            <Content padder>
                <Text>Main</Text>
            </Content>
        </Container>
    }
}
