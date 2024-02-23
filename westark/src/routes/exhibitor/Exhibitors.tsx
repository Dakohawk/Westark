// Displays list of exhibitor to select and button to go to exhibitor creation.

import {
  Outlet,
  // redirect,
  NavLink,
  useLoaderData,
} from 'react-router-dom';
import type { LoaderFunction } from 'react-router';

// Returns an Array Of Exhibitor Objects.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/exhibitors/' + params.season,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve list of exhibitors.');
  }
};

export default function Exhibitors() {
  const exhibitors = useLoaderData() as Exhibitor[];

  return (
    <>
      <div id="sidebar">
        <NavLink to={`new`}>
          <button type="submit">New</button>
        </NavLink>
        <nav>
          {exhibitors.length ? (
            <ul>
              {exhibitors.map((exhibitor) => (
                <li key={exhibitor.id}>
                  <NavLink to={`${exhibitor.id}`}>
                    {exhibitor.name} - {exhibitor.age}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Exhibitors</p>
          )}
        </nav>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}

Exhibitors.loader = loader;
