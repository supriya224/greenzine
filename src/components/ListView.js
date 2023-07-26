import React, { useEffect, useState } from "react";
import "./ListView.css";

const ListView = () => {
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=2");
        const data = await response.json();
        console.log(response.data);
        setDataList(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredList = dataList.filter((item) =>
    item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="list-view">
      <div className="input-list">
        <input
          className="input-item"
          type="text"
          placeholder="Search by first name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {filteredList.map((item) => (
        <div key={item.id}>
          <p id="item">{item.id}</p>
          <img src={item.avatar} alt={item.first_name} className="img" />
          <h3 className="heading">{item.first_name}</h3>
         
        </div>
      ))}
    </div>
  );
};

export default ListView;
