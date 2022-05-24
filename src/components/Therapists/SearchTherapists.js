import React, { useState, useCallback, useEffect } from "react";
// import { Link } from "react-router-dom";
import TherapistCard from "./TherapistCard";
import { FilterTherapists } from "../../api/ApiClient";
import { Alert, Button, Collapse, Dropdown, DropdownButton, Form, FormSelect, Pagination } from "react-bootstrap";
import "./TherapistSearch.css";
import Pages from "./Pages";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const searchTherapists = () => {
  const [query, setQuery] = useState("");
  const [therapistTitleoption, setTherapistTitleOption] = useState("");
  const [genderoption, setGenderOption] = useState("");
  const [degreeoption, setDegreeOption] = useState("");
  const [yoeoption, setYoeOption] = useState("");
  const [pageNumberoption, setpageNumberOption] = useState(1);
  const [numOfPages, setnumOfPages] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const therapistTitles = [
    "Marriage and Family",
    "Addiction",
    "Behavioral",
    "Divorce",
    "Child",
    "Clinical",
    "Cognitive",
    "Cognitive-behavioral",
    "Eating disorder",
    "Exercise",
    "Youth",
    "Social work",
    "School",
    "Trauma",
    "Nutritional",
    "Dialectical",
    "Psychodynamic",
  ];

  useEffect(
    (event) => {
      // console.log(therapistTitleoption, genderoption, degreeoption, yoeoption)
      if (event) event.preventDefault();
      if (!query) return;
      setLoading(true);
      FilterTherapists(
        query,
        therapistTitleoption,
        genderoption,
        degreeoption,
        +yoeoption.split("-")[0],
        +yoeoption.split("-")[1],
        pageNumberoption
      )
        .then((response) => {
          if (response.data.success) {
            setData(response.data.searchResults);
            const numOfPages = response.data.numOfPages;
            setnumOfPages(response.data.numOfPages);
            setError("");
            const showNumbers = 11;
            const start = pageNumberoption - Math.floor(showNumbers / 2) <= 0 ? 1 : pageNumberoption - Math.floor(showNumbers / 2);
            const end =
              pageNumberoption + Math.floor(showNumbers / 2) > numOfPages ? numOfPages : pageNumberoption + Math.floor(showNumbers / 2);
            let pages = [];
            for (let number = start; number <= end; number++) {
              pages.push(
                <Pagination.Item key={number} active={number === pageNumberoption} onClick={(e) => setpageNumberOption(+e.target.text)}>
                  {number}
                </Pagination.Item>
              );
            }
            setItems(pages);
          } else {
            setError(response.data.message);
            setData([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setData([]);
          setLoading(false);
          return;
        });
    },
    [query, therapistTitleoption, genderoption, degreeoption, yoeoption, pageNumberoption]
  );

  const setQueryValue = useCallback((e) => setQuery(e.target.value));

  return (
    <div>
      <Form className="therapistSearch" onSubmit={() => event.preventDefault()}>
        <div className="searchBar">
          <Form.Control
            className="searchField"
            type="text"
            value={query}
            isInvalid={error}
            placleholder="Search..."
            name="Search For Therapists"
            id="search"
            onChange={setQueryValue}
          />
          <label htmlFor="search"></label>
          <Button className="optionBtn" onClick={() => setOpen(!open)}>
            Options{" "}
          </Button>
        </div>
        <Collapse in={open} className="collapsible">
          <Form.Group>
            <Form.Select
              as="select"
              className="dropdown"
              value={therapistTitleoption}
              onChange={(e) => setTherapistTitleOption(e.target.value)}
            >
              <option key="" value="">
                Therapist title (Any)
              </option>
              {therapistTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </Form.Select>
            <Form.Select as="select" className="dropdown" value={genderoption} onChange={(e) => setGenderOption(e.target.value)}>
              <option key="" value="">
                Gender (Any)
              </option>
              <option key="male" value="male">
                Male
              </option>
              <option key="female" value="female">
                Female
              </option>
            </Form.Select>
            <Form.Select as="select" className="dropdown" value={degreeoption} onChange={(e) => setDegreeOption(e.target.value)}>
              <option key="" value="">
                Degree (Any)
              </option>
              <option value="Masters">Masters</option>
              <option value="Phd">Phd</option>
            </Form.Select>
            <Form.Select
              as="select"
              className="dropdown dropdownYears"
              value={yoeoption}
              onChange={(e) => setYoeOption(e.target.value)}
              //   onChange={(e) => console.log(e.target.value)}
            >
              <option key="" value="">
                Years of Experience (Any)
              </option>
              <option key="0-5" value="0-5">
                0-5
              </option>
              <option key="5-10" value="5-10">
                5-10
              </option>
              <option key="10-15" value="10-15">
                10-15
              </option>
              <option key="15-20" value="15-20">
                15-20
              </option>
            </Form.Select>
          </Form.Group>
        </Collapse>
      </Form>
      <div className="therapist-parent-container">
        {data.map((therapist, key) => {
          return (
            <div key={key} className="therapist-container">
              <TherapistCard therapist={therapist} />
            </div>
          );
        })}
      </div>
      <div className="pagesContainer">
        <Pages items={items} numOfPages={numOfPages} currpage={pageNumberoption} onChange={(e) => setpageNumberOption(e)} />
      </div>
      <LoadingSpinner display={isLoading} />
      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default searchTherapists;
