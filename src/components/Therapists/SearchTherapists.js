import React, { useState, useCallback, useEffect } from "react";
// import { Link } from "react-router-dom";
import TherapistCard from "./TherapistCard";
import { FilterTherapists } from "../../api/ApiClient";
import { Alert, Button, Collapse, Dropdown, DropdownButton, Form, FormSelect } from "react-bootstrap";
import "./TherapistSearch.css";

const searchTherapists = () => {
  const [query, setQuery] = useState("");
  const [therapistTitleoption, setTherapistTitleOption] = useState("");
  const [genderoption, setGenderOption] = useState("");
  const [degreeoption, setDegreeOption] = useState("");
  const [yoeoption, setYoeOption] = useState("");
  const [pageNumberoption, setpageNumberOption] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const therapistTitles = [
		'Marriage and Family','Addiction','Behavioral','Divorce','Child','Clinical','Cognitive','Cognitive-behavioral',
		'Eating disorder','Exercise','Youth','Social work','School','Trauma','Nutritional','Dialectical','Psychodynamic',
  ];
  let years = [];
  for (let i = 0 ; i <= 20 ; i++) 
	years.push(<option key={i} value={i} >{i}</option>);

  useEffect(
    (event) => {
		// console.log(therapistTitleoption, genderoption, degreeoption, yoeoption)
      if (event) event.preventDefault();
      if (!query) return;
	  
      FilterTherapists(query, therapistTitleoption, genderoption, degreeoption, yoeoption)
        .then((response) => {
          if (response.data.success) {
            setData(response.data.searchResults);
            setError("");
          } else {
            setError(response.data.message);
            setData([]);
          }
        })
        .catch((error) => {
          setError(error.response.data.message);
          setData([]);
          return;
        });
    },
    [query,therapistTitleoption, genderoption, degreeoption, yoeoption]
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
		<Button className="optionBtn" onClick={() => setOpen(!open)}>Options </Button>
		</div>
		<Collapse in={open} className="collapsible">
			<Form.Group >
				<Form.Select as="select" className="dropdown" value={therapistTitleoption} onChange={(e) => setTherapistTitleOption(e.target.value)}>
					<option key='' value=''>Therapist title (Any)</option>
					{therapistTitles.map((title) => <option key={title} value={title}>{title}</option>)}
				</Form.Select> 
				<Form.Select as="select" className="dropdown"  value={genderoption} onChange={(e) => setGenderOption(e.target.value)}>
					<option key='' value=''>Gender (Any)</option>
					<option key="male" value="male">Male</option>
					<option key="female" value="female">Female</option>
				</Form.Select>
				<Form.Select as="select" className="dropdown"  value={degreeoption} onChange={(e) => setDegreeOption(e.target.value)}>
					<option key='' value=''>Degree (Any)</option>
					<option value="Masters">Masters</option>
					<option value="Phd">Phd</option>
				</Form.Select>
				<Form.Select as="select" className="dropdown"  value={yoeoption} onChange={(e) => setYoeOption(e.target.value)}>
					<option key='' value=''>Years of Experience (Any)</option>
					{years}
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
      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default searchTherapists;
