import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UiTest from './UiTest';
import ToJson from './ToJson';
import DeepLinkTest from './DeepLinkTest';
import BarChart from './d3/BarChart';
import TreeMap from './d3/TreeMap';
import BubbleChart from './d3/BubbleChart';
import TidyTree from './d3/TidyTree';
import CirclePacking from './d3/CirclePacking';
import ZoomCirclePacking from './d3/ZoomCirclePacking';
import Matrix from './d3/Matrix';
import HierarchiBar from './d3/HierarchiBar';
import LineChart from './d3/LineChart';

const baseUrl = '/d3-test-app/';
const arr = [
    { no: 1, ko: 'ㄱ', en: 'a' },
    { no: 2, ko: 'ㄴ', en: 'b' },
    { no: 3, ko: 'ㄷ', en: 'c' },
    { no: 4, ko: 'ㄹ', en: 'd' },
    { no: 5, ko: 'ㅁ', en: 'e' }
];

function FnArr({ no, ko }) {
    return (
        <h3>
            no : {no}, ko : {ko}
        </h3>
    );
}

function FnTo() {
    return (
        <div>
            {arr.map((d, i) => (
                <FnArr no={d.no} ko={d.ko} key={i} />
            ))}
            <UiTest />
        </div>
    );
}

function App() {
    return (
        <Router>
            <ul>
                <li>
                    <Link to={baseUrl}>Home</Link>
                </li>
                {routes.map((r, i) => (
                    <li key={i}>
                        <Link to={r.path}>{r.name}</Link>
                    </li>
                ))}
            </ul>

            <Route exact path={baseUrl} render={() => <FnTo />} />
            {routes.map((r, i) => (
                <Route path={r.path} render={r.render} key={i} />
            ))}
        </Router>
    );
}

const routes = [
    {
        name: 'BarChart',
        path: baseUrl + 'BarChart',
        render: () => <BarChart />
    },
    {
        name: 'BubbleChart',
        path: baseUrl + 'BubbleChart',
        render: () => <BubbleChart />
    },
    {
        name: 'TreeMap',
        path: baseUrl + 'TreeMap',
        render: () => <TreeMap />
    },
    {
        name: 'TidyTree',
        path: baseUrl + 'TidyTree',
        render: () => <TidyTree />
    },
    {
        name: 'CirclePacking',
        path: baseUrl + 'CirclePacking',
        render: () => <CirclePacking />
    },
    {
        name: 'ZoomCirclePacking',
        path: baseUrl + 'ZoomCirclePacking',
        render: () => <ZoomCirclePacking />
    },
    {
        name: 'Matrix',
        path: baseUrl + 'Matrix',
        render: () => <Matrix />
    },
    {
        name: 'HierarchiBar',
        path: baseUrl + 'HierarchiBar',
        render: () => <HierarchiBar />
    },
    {
        name: 'LineChart',
        path: baseUrl + 'LineChart',
        render: () => <LineChart />
    },{
        name: 'ToJson',
        path: baseUrl + 'ToJson',
        render: () => <ToJson />
    },{
        name: 'DeepLinkTest',
        path: baseUrl + 'DeepLinkTest',
        render: () => <DeepLinkTest />
    }
];

export default App;
