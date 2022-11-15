const { useState, useEffect } = require("react");

function Test() {
  const [backData, setBackData] = useState();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackData(data);
      });
  }, []);

  return (
    <div>
      {typeof backData == "undefined" ? (
        <p>Loading...</p>
      ) : (
        backData.users.map((user, i) => {
          return <p>{user}</p>;
        })
      )}
    </div>
  );
}

export default Test;
