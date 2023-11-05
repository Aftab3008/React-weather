import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {url,geoApi} from "./api";

const Search=({onsearchChange})=>{
  const [search,setsearch]=useState(null)
  const handlechange=(value)=>{
     setsearch(value);
     onsearchChange(value);
    // console.log(value);
  }
  const loadOptions=async(search)=>{
    try {
      const response = await fetch(`${url}/cities?minPopulation=1000000&namePrefix=${search}`,geoApi);
      const result = await response.json();
      console.log(result);
      return {
        options: result.data.map((city) => ({ value:`${city.latitude} ${city.longitude}`, label: `${city.name},${city.countryCode}`})),
      }
    } catch (error) {
      console.error(error);
    }
}
    return(
    <AsyncPaginate 
    placeholder="Search for the city"
    debounceTimeout={600}
    value={search}
    onChange={handlechange}
    loadOptions={loadOptions}/>
    )
}
export default Search;