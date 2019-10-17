
import React from "react";
import IconButton from "./IconButton";
import GradientButton from "./GradientButton";
import { data } from "../../data";

const ButtonList = () =>{
    return data.map( app => {
        if(app.colors){
            return <GradientButton app={app} key={app.name} />
        }else{
            return (
                <IconButton app={app} kex={app.name} />
            );
        }
    });
};

export default ButtonList;