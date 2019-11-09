import React from 'react';
import SingleMessage from "../displays/SingleMessage";

function generateMessages(content, memberOfTeam){
  return (
    Object.keys(content).map((key) => (
        content[key].team === memberOfTeam ?
            <SingleMessage key={key} value={content[key].message} sender={content[key].user} date={content[key].date} /> : null
    ))
  );
}

export default function Messages(props) {
  return (
    <div>
        {generateMessages(props.messages, props.memberOfTeam)}
    </div>
  );
}