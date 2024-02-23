import { Form, NavLink, useLoaderData } from 'react-router-dom';

export async function loader(): Promise<Season[]> {
  try {
    const response = await fetch('http://localhost:3001/api/seasons');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Seasons from Database.');
  }
}

export default function Seasons() {
  const seasons = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <div className="sub-header">
        <h2>Admin Tools</h2>
      </div>
      <div id="season-list">
        <h3>Show Years</h3>
        <nav>
          {seasons.length ? (
            <ul>
              {seasons.map((season) => (
                <li key={season.id}>
                  <NavLink to={`season/${season.id}`}>
                    <span>{season.year}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No seasons</p>
          )}
        </nav>
        <Form action="season">
          <button type="submit" id="new-show-year-button">
            New
          </button>
        </Form>
      </div>
    </>
  );
}
