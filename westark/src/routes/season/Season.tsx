import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

export async function loader({ params }: any): Promise<Season> {
  try {
    const response = await fetch(
      'http://localhost:3001/api/season/' + params.season,
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error('Failed to retrieve Season from Database.');
  }
}

export default function Season() {
  const season = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <div className="sub-header">
        <h2>Show Season {season.year}</h2>
      </div>
      <div id="season-navbar">
        <NavLink to="points" className="season-navlink">
          Point Entry
        </NavLink>
        <NavLink to="class" className="season-navlink">
          Classes
        </NavLink>
        <NavLink to="exhibitor" className="season-navlink">
          Exhibitors
        </NavLink>
        <NavLink to="show" className="season-navlink">
          Shows
        </NavLink>
        <NavLink to="division" className="season-navlink">
          Divisions
        </NavLink>
        <NavLink to="../admin" className="season-navlink">
          Back To Season Select
        </NavLink>
      </div>
      {/* <Form
				id = "season-destroy"
				method="post"
				action="destroy"
				onSubmit={(event) => {
				if (
					!confirm(
					"Please confirm you want to delete this record."
					)
				) {
					event.preventDefault();
				}
				}}
			>
				<button type="submit">Delete</button>
			</Form> */}
      <div id="season-content">
        <Outlet />
      </div>
    </>
  );
}
