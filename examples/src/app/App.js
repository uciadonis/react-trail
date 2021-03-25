import React from 'react';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';

import Trails from './Trails';
import Home from './Home';
import NotFound from './NotFound';

import ItemList from '../items/ItemList';
import Item from '../items/Item';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 600,
        margin: 'auto',
        minHeight: 300,
    },
    navContainer: {
        width: 60,
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        margin: "10",
    },
    nav: {
        listStyle: 'none',
        paddingLeft: 5,
        display: 'flex'
    },
    link: {
        padding: '4px 8px'
    },
};

export default () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div style={styles.container}>
            <nav style={styles.navContainer}>
                <ul style={styles.nav}>
                    <li><Link to={Trails.Home.toUrl()} style={styles.link}>Home</Link></li>
                    <li><Link to={Trails.ItemList.toUrl()} style={styles.link}>Items</Link></li>
                </ul>
            </nav>
            <Switch>
                {Trails.Home.toRoute({ component: Home, invalid: NotFound }, true)}
                {Trails.ItemList.toRoute({ component: ItemList, invalid: NotFound }, true)}
                {Trails.Item.toRoute({ component: Item, invalid: NotFound }, true)}
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);
