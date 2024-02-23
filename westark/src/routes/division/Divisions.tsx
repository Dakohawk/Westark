// Displays list of division to select and button to go to division creation.

import {
  Outlet,
  // redirect,
  NavLink,
  useLoaderData,
} from 'react-router-dom';
import type { LoaderFunction } from 'react-router';

// Returns an Array Of Division Objects.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/divisions/' + params.season,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve list of divisions.');
  }
};

export default function Divisions() {
  const divisions = useLoaderData() as Division[];

  return (
    <>
      <div id="sidebar">
        <NavLink to={`new`}>
          <button type="submit">New</button>
        </NavLink>
        <nav>
          {divisions.length ? (
            <ul>
              {divisions.map((division) => (
                <li key={division.id}>
                  <NavLink to={`${division.id}`}>
                    {division.description} {division.start_age} -{' '}
                    {division.end_age}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Classes</p>
          )}
        </nav>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}

Divisions.loader = loader;
