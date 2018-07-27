import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Header, Left, Right, Body, Title, Icon, Button, Text } from 'native-base'

const renderHeader = ({dispatch}) => (
    <Header>
        <Left>
            <Button transparent>
                <Icon name='heart' />
            </Button>
        </Left>
        <Body>
            <Title>Hello</Title>
        </Body>
        <Right />
    </Header>
)
@connect(({hello}) => ({hello}))
class Hello extends Component {
    static navigationOptions = props => ({
        title: 'Hello',
        header: renderHeader(props)
    })
    render () {
        const { hello } = this.props
        // const { navigate, dispatch } = this.props.navigation
        const navigate = this.props.navigation.navigate
        return <Container>
            <Content padder>
                <Text>Hello, { hello.welcome }</Text>
                <Button onPress={() => navigate('Main')}>
                    <Text>Main</Text>
                </Button>
            </Content>
        </Container>
    }
}

export default Hello
