// import 'core-js/es6/symbol'
// import 'core-js/fn/symbol/iterator'
import dva from './app/utils/dva-rn'
import navigator from './app/navigators'
import * as models from './app/models'

const app = dva({
    navigator
})

app.model({
    namespace: 'app',
    state: {},
    subscriptions: {
        setup ({ dispatch, history }) {

        }
    }
})

Object.values(models).forEach(model => app.model(model))

setTimeout(() => {
    console.log(app._store.getState())
}, 1000)

const App = app.start()

export default App
