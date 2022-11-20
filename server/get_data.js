const connectPool = require("./connecting_db");

async function getSearchData(
  tableName,
  allColumnName,
  columnNameToSearch,
  searchWord
) {
  let arrSearchDataList;
  await connectPool
    .query(`SELECT ${allColumnName} FROM ?? WHERE ?? = ?`, [
      tableName,
      columnNameToSearch,
      searchWord,
    ])
    .then((result) => {
      arrSearchDataList = result[0];
      // ... обработка результата запроса ...
    });

  return arrSearchDataList;
}
async function getSearchDataTwoOr(
  tableName,
  allColumnName,
  columnNameToSearch,
  searchWord,
  columnNameToSearchTwo,
  searchWordTwo
) {
  let arrSearchDataList;
  await connectPool
    .query(`SELECT ${allColumnName} FROM ?? WHERE ?? = ? OR ?? = ?`, [
      tableName,
      columnNameToSearch,
      searchWord,
      columnNameToSearchTwo,
      searchWordTwo,
    ])
    .then((result) => {
      arrSearchDataList = result[0];
      // ... обработка результата запроса ...
    });

  return arrSearchDataList;
}
async function getSearchDataTwoAnd(
  tableName,
  allColumnName,
  columnNameToSearch,
  searchWord,
  columnNameToSearchTwo,
  searchWordTwo
) {
  let arrSearchDataList;
  await connectPool
    .query(`SELECT ${allColumnName} FROM ?? WHERE ?? = ? AND ?? = ?`, [
      tableName,
      columnNameToSearch,
      searchWord,
      columnNameToSearchTwo,
      searchWordTwo,
    ])
    .then((result) => {
      arrSearchDataList = result[0];
      // ... обработка результата запроса ...
    });

  return arrSearchDataList;
}
async function getDataID(tableName, allColumnName, searchWord) {
  let arrSearchDataList;
  await connectPool
    .query(`SELECT ${allColumnName} FROM ?? WHERE ID = ?`, [
      tableName,
      searchWord,
    ])
    .then((result) => {
      arrSearchDataList = result[0];
      // ... обработка результата запроса ...
    });

  return arrSearchDataList;
}

async function updateDataID(tableName, columnName, value, id) {
  await connectPool.query(`UPDATE ${tableName} SET ?? = ? WHERE ID = ?`, [
    columnName,
    value,
    id,
  ]);

  return true;
}

module.exports = {
  getSearchData: getSearchData,
  getSearchDataTwoOr: getSearchDataTwoOr,
  getSearchDataTwoAnd: getSearchDataTwoAnd,
  getDataID: getDataID,
  updateDataID: updateDataID,
};
