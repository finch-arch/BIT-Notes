import React from "react";
import "../About.css";
import add from './Images/add.PNG'; // with import
import create from './Images/create.PNG'; // with import
import edit from './Images/edit.PNG'; // with import
export default function About() {
  return (
    <>
      <div className="container ">
        <div className="text">
          <div className="infoapp">
            <div className="headd">Facing difficulty to remember your class Notes?</div>
            <div className="headd1">Have this Application to save your Notes and Study before exams </div>
            <div className="liab d-flex align-items-center">
              
              <div className="c1">
              
              <div className="card " style={{width: "32rem"}}>
                <img className="card-img-top" src={create} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Create your Account</h5>
                </div>
              </div>

              <div className="card mx-2" style={{width: "32rem"}}>
                <img className="card-img-top" src={add} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Add Notes</h5>
                </div>
              </div>
              </div>
             
              <div className="c2">
              <div className="card mx-2" style={{width: "32rem"}}>
                <img className="card-img-top" src={edit} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Edit your Notes</h5>
                </div>
              </div>

              <div className="card mx-2" style={{width: "32rem"}}>
                <img className="card-img-top" src={add} alt="Card  cap" />
                <div className="card-body">
                  <h5 className="card-title">Delete Notes</h5>
                </div>
              </div>
              </div>
             
  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
