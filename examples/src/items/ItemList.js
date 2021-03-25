import React from 'react';
import { Link } from 'react-router-dom';
import { ItemListTrail, ItemTrail } from '../app/Trails';
import { Items, itemCategory, itemStatus, Categories } from './ItemMocks';

const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
    },
    filter: {
        paddingLeft: 20,
    },
    columns: {
        padding: "0 20px 10px 0"
    }
}

class ItemList extends React.Component {
    replaceTrail(token) {
        const { isActive, categoryID } = this.props;
        const tokens = {
            isActive,
            categoryID
        };
        const nextTrail = ItemListTrail.toUrl({
            ...tokens,
            ...token
        });
        this.props.history.replace(nextTrail);
    }

    handleSelectStatus = event => {
        const isActive = event.target.value;
        this.replaceTrail({ isActive });
    }

    handleSelectCategory = event => {
        const categoryID = event.target.value;
        this.replaceTrail({ categoryID });
    }

    render() {
        const { isActive, categoryID } = this.props;
        return (
            <div>
                <header style={styles.toolbar}>
                    <h3>Items</h3>
                    <div style={styles.filter}>
                        <select id='isActive' value={isActive} onChange={this.handleSelectStatus}>
                            <option value='undefined'>All statuses</option>
                            <option value='true'>Active</option>
                            <option value='false'>Inactive</option>
                        </select>
                        <select id='categoryID' value={categoryID} onChange={this.handleSelectCategory}>
                            {[
                                <option key='All categories' value='undefined'>All categories</option>,
                                ...Categories.map(category => <option key={category.name} value={category.id}>{category.name}</option>)
                            ]}
                        </select>
                    </div>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Items
                            .filter(item => (isActive === undefined || item.isActive === isActive) && (categoryID === undefined || item.categoryID === categoryID))
                            .map(item => (
                                <tr key={item.id}>
                                    <td style={styles.columns}>{ItemTrail.toLink(item.name, { id: item.id })}</td>
                                    <td style={styles.columns}>{itemCategory(item)}</td>
                                    <td style={styles.columns}>{itemStatus(item)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};

export default ItemList;