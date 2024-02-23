// Displays list of classes to select and button to go to class creation.

import {
  Outlet,
  // redirect,
  NavLink,
  useLoaderData,
} from 'react-router-dom';
import type { LoaderFunction } from 'react-router';

// Returns an Array Of ShowClass Objects.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/classes/' + params.season,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve list of ShowClass.');
  }
};

export default function ShowClass() {
  const showClasses = useLoaderData() as ShowClass[];

  return (
    <>
      <div id="sidebar">
        <NavLink to={`new`}>
          <button type="submit">New</button>
        </NavLink>
        <nav>
          {showClasses.length ? (
            <ul>
              {showClasses.map((showClass) => (
                <li key={showClass.id}>
                  <NavLink to={`${showClass.id}`}>
                    {showClass.ride_order} {showClass.description}
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

ShowClass.loader = loader;

// export default function Classes() {
//     const classes = useLoaderData();

//     return (
// 		<>
//     		<div id="sidebar">
// 				<NavLink
//                     to={`new`}
//                     reloadDocument
//                 >
// 					<button type="submit">New</button>
// 				</NavLink>
//                 <nav>
//                     {classes.length ? (
//                         <ul>
//                             {classes.map((klass) => (
//                                 <li key={klass.id}>
//                                     <NavLink
//                                         reloadDocument
//                                         to={`${klass.id}`}
//                                     >
//                                         {klass.ride_order} {klass.description}
//                                     </NavLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No Classes</p>
//                     )}
//                 </nav>
//             </div>
//             <div id="content">
//                 <Outlet />
//             </div>

//         </>
//     );
// }
