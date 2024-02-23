import { useLoaderData } from 'react-router-dom';
import type { LoaderFunction } from 'react-router';

const loader: LoaderFunction = async ({ params }) => {
  try {
    const showResponse = await fetch(
      'http://localhost:3001/api/show/' + params.show,
    );
    if (!showResponse.ok) throw new Error('Failed to retrieve shows from DB.');
    const showData = await showResponse.json();

    const showClassResponse = await fetch(
      'http://localhost:3001/api/class/' + params.class,
    );
    if (!showClassResponse.ok)
      throw new Error('Failed to retrieve classes from DB.');
    const showClassData = await showClassResponse.json();

    const entriesResponse = await fetch(
      'http://localhost:3001/api/entries/' + params.show + '/' + params.class,
    );
    if (!showClassResponse.ok)
      throw new Error('Failed to retrieve entries from DB.');
    const entriesData = await entriesResponse.json();

    const data = {
      show: showData[0],
      showClass: showClassData[0],
      entries: entriesData,
    };
    console.log('entries ' + JSON.stringify(entriesData));
    console.log('data ' + JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Division from database.');
  }
};

export default function Point() {
  const { show, showClass, entries } = useLoaderData() as {
    show: Show;
    showClass: ShowClass;
    entries: Entry[];
  };

  if (showClass.is_timed) {
    return (
      <>
        <div>
          {entries.length} Entries <br></br>
          {show.start_date.substring(0, 10)} - {show.identifier}
          {showClass.description} {showClass.is_timed}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Judged Event</div>
      </>
    );
  }
}

Point.loader = loader;
