import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function RemainingSeedpods({ max, remaining }) {
    let pathColor;
    if (max === 50) pathColor = "#8173ff";
    else pathColor = "#269485";
    return (
        <div style={{"marginTop":"0.8rem", "width":"200px", "height":"200px", "maxWidth":"93%" }}>
            <CircularProgressbarWithChildren value={remaining} maxValue={max} styles={buildStyles({pathColor: pathColor})}>
                <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"center", "alignItems":"center"}}>
                    <div>{remaining}</div>
                    <div style={{"display":"flex", "alignItems":"center", "height":"25%"}}>---</div>
                    <div>{max}</div>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );

}

export default RemainingSeedpods;