import React from 'react'
// import {Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import UsersListPage, {loadData} from './pages/UsersListPage'
import App from './App'
import NotFoundPage from './pages/NotFoundPage'
import AdminsListPage from './pages/AdminsListPage'

//set up all route mappings

// export default () => {
//     return(
//         <div>
//             <Route exact path="/" component={HomePage}/>
//             <Route path="/users" component={UsersListPage}/>
//         </div>
//     )
// }

// export default [
//     {
//         ...HomePage,
//         path: '/',
//         //component: HomePage,
//         exact: true
//     },
//     {
//         ...UsersListPage,
//         //loadData,
//         path: '/users',
//         //component: UsersListPage
//     }
// ];

//COMPONENT NESTING

export default [
    {
        ...App,
        //no path to App => it will always be displayed
        //when we call matchRoutes/renderRoutes
        //react router config understands these components need to be nested inside App
        //App component is passed child component as prop to render necessary route
        routes: [ //child routes rendered by the App
            {
                ...HomePage,
                path: '/',
                //component: HomePage,
                exact: true
            },
            {
                ...AdminsListPage,
                path: '/admins'
            },
            {
                ...UsersListPage,
                //loadData,
                path: '/users',
                //component: UsersListPage
            },
            {
                ...NotFoundPage
            }
        ]
    }
];