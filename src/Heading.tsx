import React from 'react'

interface Props
{
  h1aText: string;
  //"number" represents an int or decimal
  //question mark makes the field nullable(sim to C#)
  h1bText?: number;
  pText: string;

}

const Heading = (props: Props) => 
{
    return (
        <div>
            <h1>
                {props.h1aText}
            </h1>
            <p>{props.pText}</p>
        </div>
    )
}

export default Heading
