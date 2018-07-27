import appInfo from '../../app.json'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { Platform, BackHandler, Linking } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { create } from 'dva-core'

const NAVIGATION = 'Navigation'

export default (opts = {}) => {
    const AppNavigator = opts.navigator
    const { getStateForAction, getActionForPathAndParams } = AppNavigator.router

    @connect(state => ({nav: state[NAVIGATION]}))
    class Router extends Component {
        componentDidMount () {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
            Linking.getInitialURL().then(url => {
                url && this.handleOpenURL({ url })
            })
        }
        componentWillUnmount () {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
        }
        handleOpenURL ({ url }) {
            const { dispatch, nav } = this.props
            const prefix = Platform.select({
                ios: `${appInfo.name}://`,
                android: `${appInfo.name}://${appInfo.name}/`
            })
            const path = url.split(prefix)[1]
            const currRouteName = getCurrentRouteName(nav)
            if (path !== currRouteName) {
                const action = getActionForPathAndParams(path || url)
                if (action) dispatch(action)
            }
        }
        onBackPress = () => {
            const { dispatch, nav } = this.props
            if (nav.index === 0) {
                return false
            }
            dispatch(NavigationActions.back())
            return true
        }
        render () {
            const { dispatch, nav } = this.props
            const App = reduxifyNavigator(Router, 'root')
            const navigation = {
                dispatch,
                state: nav,
            }
            return <App {...navigation} />
        }
    }
    const navigationMiddleware = createReactNavigationReduxMiddleware(
        'root',
        state => state.nav,
    )

    const initialState = getStateForAction(NavigationActions.init())
    const navReducer = (state = initialState, action) => {
        if (~action.type.indexOf(NAVIGATION)) {
            const nextState = getStateForAction(action, state)
            return nextState || state
        } else {
            return state
        }
    }

    const createOpts = {
        initialReducer: {
            [NAVIGATION]: navReducer
        },
        setupMiddlewares (middlewares) {
            return [...middlewares, navigationMiddleware]
        }
    }

    const app = create(opts, createOpts)
    if (opts.models) {
        opts.models.forEach(model => app.model(model))
    }

    const oldAppStart = app.start
    app.start = () => {
        oldAppStart.call(app)
        const store = app._store
        return props => (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }

    return app
}

export function getCurrentRouteName (navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}
