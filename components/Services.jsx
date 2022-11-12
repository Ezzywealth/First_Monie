import React from "react";
import { servicesData } from "../utils/constants";

const Services = () => {
  return (
    <div>
      <div>
        <div>
          <h2>Our Services</h2>
          <p></p>
        </div>
        <div>
          {servicesData.map((data) => (
            <div key={data.id}>
              <div>
                <span>{data.icons}</span>
                <span>{data.title}</span>
              </div>
              <div>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
