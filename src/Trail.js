import React from 'react';
import { Route, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import warning from 'warning';

import TrailBase from './Base/TrailBase';
import { parseQueryString } from './parseUtils';

function isEmptyChildren(children) {
    return React.Children.count(children) === 0;
};

export default class Trail extends TrailBase {
    
    constructor(path, pathParamDefs = {}, queryStringParamDefs = {}) {
        super(path, pathParamDefs, queryStringParamDefs);
    }

    toLink(children, params, props = {}) {
        warning(!props.to, 'toLink props should not include a to prop; it will be overwritten');
        const linkProps = {
            ...props,
            to: this.toUrl(params),
        };
        return <Link {...linkProps}>{children}</Link>;
    }

    toRoute(renderOptions, exact = false, strict = false, sensitive = false) {
        const { component, render, children, invalid } = renderOptions;
        warning(component || render || children, 'Trail.toRoute requires renderOptions argument, which must include either component, render or children property');
        warning(invalid, 'Trail.toRoute requires renderOptions argument, which must include an invalid property, indicating the component to render when the a matched trail contains an invalid parameter');

        const routeProps = {
            path: this.path,
            exact,
            strict,
            sensitive,
        };

        const getPropsWithParams = props => {
            const { location, match } = props;
            const tokens = this.parseTrailParams(location, match);
            if (tokens === null) {
                return null;
            }
            {/* TODO warn about collisions between route params and qs params */}
            return {
                ...props,
                ...tokens,
            };
        }

        if (component) {
            return <Route {...routeProps} render={props => {
                const propsWithParams = getPropsWithParams(props)
                if (propsWithParams === null) {
                    // schema validation error ocurred, render Invalid component
                    return React.createElement(invalid);
                }
                const element = React.createElement(component, propsWithParams);
                return element;
            }} />
        } else if (render) {
            return <Route {...routeProps} render={props => {
                const propsWithParams = getPropsWithParams(props)
                if (propsWithParams === null) {
                    // schema validation error ocurred, render Invalid component
                    return React.createElement(invalid);
                }
                return render(propsWithParams);
            }} />
        } else if (typeof children === "function") {
            return <Route {...routeProps} children={props => {
                const { match } = props;
                if (match) {
                    const propsWithParams = getPropsWithParams(props)
                    if (propsWithParams === null) {
                        //schema validation error ocurred, render Invalid component
                        return React.createElement(invalid);
                    }
                    return children(propsWithParams);
                } else {
                    return children(props);
                }
            }} />
        } else if (children && !isEmptyChildren(children)) {
            warning(false, 'Trail params are not passed as props to children arrays. Use a children function prop if needed.');
            return <Route {...routeProps} children={children} />
        }
    }

    parseTrailParams(trail = (window && window.location),
        match = matchPath(trail.pathname, { path: this.path })
    ) {
        warning(trail, 'trail must be explicitly provided when window object is not available.');
        warning(trail.pathname != undefined && trail.search != undefined, 'trail object must include pathname and search properties.');
        warning(trail.pathname, 'trail.pathname is required.');

        if (!match) {
            warning(false, 'trail.pathname does not match Trail.path.');
            return null;
        }

        try {
            if (!this._paramSchema) {
                return {};
            }

            const rawParams = {
                ...match.params,
                ...parseQueryString(trail.search),
            };
            return this._paramSchema.validateSync(rawParams);
        } catch (err) {
            const { name, errors } = err;
            if (name === 'ValidationError') {
                warning(false, `Trail.parseTrailParams: ${errors[0]}`);
            } else {
                throw err;
            }
            return null;
        }
    }
}
