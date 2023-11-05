/* eslint-disable react/jsx-key */
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./forcast.css";
import { startCase } from 'lodash';
const Week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/* eslint-disable jsx-a11y/label-has-associated-control */
const Forcast = ({ data }) => {
    const dayinweek = new Date().getDay();
    console.log(dayinweek);
    const forcastday = Week.slice(dayinweek, Week.length).concat(Week.slice(0, dayinweek));
    console.log(forcastday);
    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`../icons/${item.weather[0].icon}.png`} />
                                    <label className="day">{forcastday[index]}</label>
                                    <label className="description">{startCase(item.weather[0].description)}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°C /{Math.floor(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-items">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure}hPa</label>
                                </div>
                                <div className="daily-details-grid-items">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-items">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-items">
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>
                                <div className="daily-details-grid-items">
                                    <label>Sea-Level</label>
                                    <label>{Math.round(item.main.sea_level)}m</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}

            </Accordion>
        </>
    )

}
export default Forcast;