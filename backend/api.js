const Pool = require("pg").Pool;
const pool = new Pool({
  user: "dak",
  host: "localhost",
  database: "westark",
  password: "root",
  port: 5432,
});

// Season queries.
const q_selectSeasons = "SELECT * FROM season ORDER BY year DESC";
const selectSeasons = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectSeasons, (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_selectSeason = "SELECT * FROM season WHERE id=$1";
const selectSeason = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectSeason, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_createSeason = "INSERT INTO season (year) VALUES ($1) RETURNING *";
const createSeason = (body) => {
  return new Promise(function (resolve, reject) {
    const { year } = body;
    const yearFormat = /^\d{4}$/;
    if (!yearFormat.test(year)) {
      resolve("Format was not YYYY");
    } else {
      pool.query(q_createSeason, [year], (error, results) => {
        error && reject(error);
        resolve(
          `A new season has been added: ${JSON.stringify(results.rows[0])}`
        );
      });
    }
  });
};

const q_deleteSeason = "DELETE FROM season WHERE id = $1";
const deleteSeason = (body) => {
  return new Promise(function (resolve, reject) {
    const { season } = body;
    pool.query(q_deleteSeason, [season], (error, results) => {
      error && reject(error);
      resolve(`Season deleted with ID: ${season}`);
    });
  });
};

// Show queries.
const q_selectShows =
  "SELECT * FROM show WHERE season = $1 ORDER BY start_date, identifier  ASC";
const selectShows = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectShows, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_selectShow = "SELECT * FROM show WHERE id = $1";
const selectShow = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectShow, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_createShow =
  "INSERT INTO show (season, start_date, identifier) VALUES ($1, $2, $3)  RETURNING *";
const createShow = (body) => {
  return new Promise(function (resolve, reject) {
    const { season, start_date, identifier } = body;
    console.log("create " + season + start_date + identifier);
    pool.query(
      q_createShow,
      [season, start_date, identifier],
      (error, results) => {
        error && reject(error);
        resolve(
          `A new season has been added: ${JSON.stringify(results.rows[0])}`
        );
      }
    );
  });
};

const q_updateShow =
  "UPDATE show SET start_date=$1, identifier=$2 WHERE id=$3 RETURNING *;";
const updateShow = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { start_date, identifier } = body;

    pool.query(q_updateShow, [start_date, identifier, id], (error, results) => {
      error && reject(error);
      resolve(`Show updated: ${JSON.stringify(results.rows[0])}`);
    });
  });
};

const q_deleteShow = "DELETE FROM show WHERE id = $1";
const deleteShow = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(q_deleteShow, [id], (error, results) => {
      error && reject(error);
      resolve(`Show deleted with ID: ${id}`);
    });
  });
};

// Division queries.
const q_selectDivisions =
  "SELECT * FROM division WHERE season = $1 ORDER BY description ASC";
const selectDivisions = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectDivisions, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_selectDivision = "SELECT * FROM division WHERE id = $1";
const selectDivision = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectDivision, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_createDivision =
  "INSERT INTO division (season, description, start_age, end_age) VALUES ($1, $2, $3, $4)  RETURNING *";
const createDivision = (body) => {
  return new Promise(function (resolve, reject) {
    const { season, description, start_age, end_age } = body;
    pool.query(
      q_createDivision,
      [season, description, start_age, end_age],
      (error, results) => {
        error && reject(error);
        resolve(
          `A new season has been added: ${JSON.stringify(results.rows[0])}`
        );
      }
    );
  });
};

const q_updateDivision =
  "UPDATE division SET description=$1, start_age=$2, end_age=$3 WHERE id=$4 RETURNING *;";
const updateDivision = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { description, start_age, end_age } = body;

    console.log("update2 " + start_age);
    console.log("update2 " + end_age);

    pool.query(
      q_updateDivision,
      [description, start_age, end_age, id],
      (error, results) => {
        error && reject(error);
        resolve(`Division updated: ${JSON.stringify(results.rows[0])}`);
      }
    );
  });
};

const q_deleteDivision = "DELETE FROM division WHERE id = $1";
const deleteDivision = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(q_deleteDivision, [id], (error, results) => {
      error && reject(error);
      resolve(`Division deleted with ID: ${id}`);
    });
  });
};

// Exhibitor queries.
const q_selectExhibitors =
  "SELECT * FROM exhibitor WHERE season = $1 ORDER BY name ASC";
const selectExhibitors = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectExhibitors, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_selectExhibitor = "SELECT * FROM exhibitor WHERE id = $1";
const selectExhibitor = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectExhibitor, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_createExhibitor =
  "INSERT INTO exhibitor (season, name, age) VALUES ($1, $2, $3)  RETURNING *";
const createExhibitor = (body) => {
  return new Promise(function (resolve, reject) {
    const { season, name, age } = body;
    pool.query(q_createExhibitor, [season, name, age], (error, results) => {
      error && reject(error);
      resolve(
        `A new season has been added: ${JSON.stringify(results.rows[0])}`
      );
    });
  });
};

const q_updateExhibitor =
  "UPDATE exhibitor SET name=$1, age=$2 WHERE id=$3 RETURNING *;";
const updateExhibitor = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, age } = body;

    pool.query(q_updateExhibitor, [name, age, id], (error, results) => {
      error && reject(error);
      resolve(`Exhibitor updated: ${JSON.stringify(results.rows[0])}`);
    });
  });
};

const q_deleteExhibitor = "DELETE FROM exhibitor WHERE id = $1";
const deleteExhibitor = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(q_deleteExhibitor, [id], (error, results) => {
      error && reject(error);
      resolve(`Exhibitor deleted with ID: ${id}`);
    });
  });
};

// Class queries.
const q_selectClasses =
  "SELECT * FROM class WHERE season = $1 ORDER BY ride_order, description  ASC";
const selectClasses = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectClasses, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_selectClass = "SELECT * FROM class WHERE id = $1";
const selectClass = async (id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectClass, [id], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_createClass =
  "INSERT INTO class (season, ride_order, description, is_timed) VALUES ($1, $2, $3, $4)  RETURNING *";
const createClass = (body) => {
  return new Promise(function (resolve, reject) {
    const { season, ride_order, description, is_timed } = body;
    pool.query(
      q_createClass,
      [season, ride_order, description, is_timed],
      (error, results) => {
        error && reject(error);
        resolve(
          `A new class has been added: ${JSON.stringify(results.rows[0])}`
        );
      }
    );
  });
};

const q_updateClass =
  "UPDATE class SET ride_order=$1, description=$2, is_timed=$3 WHERE id=$4 RETURNING *;";
const updateClass = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { ride_order, description, is_timed } = body;

    pool.query(
      q_updateClass,
      [ride_order, description, is_timed, id],
      (error, results) => {
        error && reject(error);
        resolve(`Class updated: ${JSON.stringify(results.rows[0])}`);
      }
    );
  });
};

const q_deleteClass = "DELETE FROM class WHERE id = $1";
const deleteClass = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(q_deleteClass, [id], (error, results) => {
      error && reject(error);
      resolve(`Class deleted with ID: ${id}`);
    });
  });
};

// Entry queries.
const q_selectEntries =
  "SELECT * FROM entry WHERE show = $1 AND class = $2 ORDER BY id";
const selectEntries = async (show, showClass) => {
  console.log("select entries" + show + " " + showClass);
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(q_selectEntries, [show, showClass], (error, results) => {
        error && reject(error);
        resolve(results.rows);
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error("Internal server error");
  }
};

const q_createEntry =
  "INSERT INTO entry (season, ride_order, description, is_timed) VALUES ($1, $2, $3, $4)  RETURNING *";
const createEntry = (body) => {
  return new Promise(function (resolve, reject) {
    const { show, showClass, exhibitor, placement, time } = body;
    pool.query(
      q_createEntry,
      [show, showClass, exhibitor, placement, time],
      (error, results) => {
        error && reject(error);
        resolve(
          `A new Entry has been added: ${JSON.stringify(results.rows[0])}`
        );
      }
    );
  });
};

const q_updateEntry =
  "UPDATE entry SET placement=$1, time=$2 WHERE id=$3 RETURNING *;";
const updateEntry = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { placement, time } = body;
    pool.query(q_updateEntry, [placement, time, id], (error, results) => {
      error && reject(error);
      resolve(`Entry updated: ${JSON.stringify(results.rows[0])}`);
    });
  });
};

const q_deleteEntry = "DELETE FROM entry WHERE id = $1";
const deleteEntry = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(q_deleteEntry, [id], (error, results) => {
      error && reject(error);
      resolve(`Entry deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  selectSeasons,
  selectSeason,
  createSeason,
  deleteSeason,
  selectShows,
  selectShow,
  createShow,
  updateShow,
  deleteShow,
  selectDivisions,
  selectDivision,
  createDivision,
  updateDivision,
  deleteDivision,
  selectExhibitors,
  selectExhibitor,
  createExhibitor,
  updateExhibitor,
  deleteExhibitor,
  selectClasses,
  selectClass,
  createClass,
  updateClass,
  deleteClass,
  selectEntries,
  createEntry,
  updateEntry,
  deleteEntry,
};
