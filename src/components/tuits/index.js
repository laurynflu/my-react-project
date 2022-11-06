import React from "react";
import './tuits.css';
import Tuit from "./tuit";

function Tuits({tuits = [], deleteTuit}) {
    return (
        <div>
            <ul>
                {
                    tuits.map && tuits.map(tuit => {
                        return (
                            <Tuit tuit={tuit}/>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Tuits;