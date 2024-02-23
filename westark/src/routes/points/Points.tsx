import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import type { LoaderFunction } from 'react-router';
import { useState, useEffect } from 'react';

const loader: LoaderFunction = async ({ params }) => {
  try {
    const showResponse = await fetch(
      'http://localhost:3001/api/shows/' + params.season,
    );
    if (!showResponse.ok) throw new Error('Failed to retrieve shows from DB.');
    const showData = await showResponse.json();

    const showClassResponse = await fetch(
      'http://localhost:3001/api/classes/' + params.season,
    );
    if (!showClassResponse.ok)
      throw new Error('Failed to retrieve classes from DB.');
    const showClassData = await showClassResponse.json();

    const data = {
      shows: showData,
      showClasses: showClassData,
    };

    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Division from database.');
  }
};

export default function Points() {
  const params = useParams();
  const { shows, showClasses } = useLoaderData() as {
    shows: Show[];
    showClasses: ShowClass[];
  };
  // console.log('shows ' + JSON.stringify(shows));
  // console.log('showClasses ' + JSON.stringify(showClasses));
  // showClasses.map((showClass) =>
  //   console.log(showClass.id + showClass.ride_order + showClass.description),
  // );

  const [selectedShow, setSelectedShow] = useState(shows[0].id);
  const [selectedShowClass, setSelectedShowClass] = useState(showClasses[0].id);
  const navigate = useNavigate();

  let shouldRedirect = false;
  if (params.show !== selectedShow && params.class !== selectedShowClass) {
    shouldRedirect = true;
  }

  useEffect(() => {
    if (shouldRedirect) {
      // console.log('show ' + selectedShow);
      navigate(`${selectedShow}\\${selectedShowClass}`, {
        state: { show: selectedShow, class: selectedShowClass },
      });
    }
  }, [shouldRedirect, navigate, selectedShow, selectedShowClass]);

  return (
    <>
      <div id="sidebar">
        <select
          name="show"
          value={selectedShow}
          onChange={(e) => {
            setSelectedShow(e.target.value as unknown as number);
            console.log('showchange ' + selectedShow);
          }}
        >
          {shows.map((show) => (
            <option value={show.id} key={show.id}>
              {show.start_date.substring(0, 10)} {show.identifier}
            </option>
          ))}
        </select>
        <select
          name="showClasses"
          value={selectedShowClass}
          onChange={(e) => {
            setSelectedShowClass(e.target.value as unknown as number);
          }}
        >
          {showClasses.map((showClass) => (
            <option value={showClass.id} key={showClass.id}>
              {showClass.ride_order}. {showClass.description}
            </option>
          ))}
        </select>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}

Points.loader = loader;
