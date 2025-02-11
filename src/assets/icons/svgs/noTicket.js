import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NoTicket(props) {
    return (
        <Svg
            fill="#808080"
            width={props.width || "800px"}
            height={props.height || "800px"}
            viewBox="0 0 32 32"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M28 6h-.586L30 3.414 28.586 2 2 28.586 3.414 30l4-4H28a2.003 2.003 0 002-2v-5a1 1 0 00-1-1 2 2 0 010-4 1 1 0 001-1V8a2.002 2.002 0 00-2-2zm0 6.127a4 4 0 000 7.746V24h-7v-3h-2v3H9.414L19 14.414V19h2v-6.586L25.414 8H28zM4 12.127V8h15V6H4a2.002 2.002 0 00-2 2v5a1 1 0 001 1 2 2 0 010 4 1 1 0 00-1 1v5h2v-4.127a4 4 0 000-7.747z" />
            <Path
                id="_Transparent_Rectangle_"
                data-name="&lt;Transparent Rectangle&gt;"
                d="M0 0H32V32H0z"
                fill="none"
            />
        </Svg>
    )
}

export default NoTicket
