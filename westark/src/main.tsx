import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/Root';
import Index from './routes/Index';
import ErrorPage from './routes/ErrorPage';

import Login from './routes/Login';

import Seasons, { loader as seasonsLoader } from './routes/season/Seasons';
import Season, { loader as seasonLoader } from './routes/season/Season';
import SeasonCreate, {
  action as seasonAction,
} from './routes/season/SeasonCreate';

import Shows from './routes/show/Shows';
import Show from './routes/show/Show';
import NewShow from './routes/show/NewShow';

import Divisions from './routes/division/Divisions';
import Division from './routes/division/Division';
import NewDivision from './routes/division/NewDivision';

import ShowClasses from './routes/class/ShowClasses';
import ShowClass from './routes/class/ShowClass';
import NewShowClass from './routes/class/NewShowClass';

import Exhibitors from './routes/exhibitor/Exhibitors';
import Exhibitor from './routes/exhibitor/Exhibitor';
import NewExhibitor from './routes/exhibitor/NewExhibitor';

import Points from './routes/points/Points';
import Point from './routes/points/Point';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          children: [
            { index: true, element: <Index /> },
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'admin',
              element: <Seasons />,
              loader: seasonsLoader,
            },
            {
              path: 'admin/season',
              element: <SeasonCreate />,
              action: seasonAction,
            },
            {
              path: 'admin/season/:season',
              element: <Season />,
              loader: seasonLoader,
              children: [
                {
                  path: 'class',
                  element: <ShowClasses />,
                  loader: ShowClasses.loader,
                  children: [
                    {
                      path: ':class',
                      element: <ShowClass />,
                      loader: ShowClass.loader,
                      action: ShowClass.action,
                    },
                    {
                      path: 'new',
                      element: <NewShowClass />,
                      action: NewShowClass.action,
                    },
                  ],
                },
                {
                  path: 'show',
                  element: <Shows />,
                  loader: Shows.loader,
                  children: [
                    {
                      path: ':show',
                      element: <Show />,
                      loader: Show.loader,
                      action: Show.action,
                    },
                    {
                      path: 'new',
                      element: <NewShow />,
                      action: NewShow.action,
                    },
                  ],
                },
                {
                  path: 'division',
                  element: <Divisions />,
                  loader: Divisions.loader,
                  children: [
                    {
                      path: ':division',
                      element: <Division />,
                      loader: Division.loader,
                      action: Division.action,
                    },
                    {
                      path: 'new',
                      element: <NewDivision />,
                      action: NewDivision.action,
                    },
                  ],
                },
                {
                  path: 'exhibitor',
                  element: <Exhibitors />,
                  loader: Exhibitors.loader,
                  children: [
                    {
                      path: ':exhibitor',
                      element: <Exhibitor />,
                      loader: Exhibitor.loader,
                      action: Exhibitor.action,
                    },
                    {
                      path: 'new',
                      element: <NewExhibitor />,
                      action: NewExhibitor.action,
                    },
                  ],
                },
                {
                  path: 'points',
                  element: <Points />,
                  loader: Points.loader,
                  children: [
                    {
                      path: ':show/:class',
                      element: <Point />,
                      loader: Point.loader,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename: '/westark' },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
