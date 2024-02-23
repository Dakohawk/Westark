// Displays list of shows to select and button to go to show creation.

import {
  Outlet,
  // redirect,
  NavLink,
  useLoaderData,
} from 'react-router-dom';
import type { LoaderFunction } from 'react-router';

// Returns an Array Of Show Objects.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/shows/' + params.season,
    );
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    throw new Error('Failed to retrieve list of shows.');
  }
};

export default function Shows() {
  const shows = useLoaderData() as Show[];

  return (
    <>
      <div id="sidebar">
        <NavLink to={`new`}>
          <button type="submit">New</button>
        </NavLink>
        <nav>
          {shows.length ? (
            <ul>
              {shows.map((show) => (
                <li key={show.id}>
                  <NavLink to={`${show.id}`}>
                    {show.start_date.substring(0, 10)} {show.identifier}
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

Shows.loader = loader;
