import * as React from "react"   
import "./styles.css" 
 
const Layout = props => { 
  return ( 
        <div id="mymaindivforonscreen" > 
            {props.children} HELLO DIV
        </div>  
    )
}

export default Layout   