import { React, useState, useEffect, useRef } from 'react';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';

const Fog = ({ imgRef }) => {
    const [vantaEffect, setVantaEffect] = useState(0);
    const myRef = useRef(null);

    useEffect(() => {
        fogStyle = {
            "position":"absolute",
            "opacity":"0.6",
            "height":0.94*imgRef.current.offsetHeight,
            "width":0.94*imgRef.current.offsetWidth,
            "top":0.03*imgRef.current.offsetHeight,
            "left":0.03*imgRef.current.offsetWidth,
            "marginTop":"1.5rem",
        };
        if (!vantaEffect) {
            setVantaEffect(FOG({
                THREE,
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                highlightColor: 0xaca79e,
                midtoneColor: 0x9739a4,
                blurFactor: 0.54,
                speed: 0.70,
                zoom: 0.80
            }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }

    }, [vantaEffect, imgRef]);

    return <div ref={myRef} style={fogStyle} />
}

let fogStyle = {
    "position":"absolute",
    "opacity":"0.6",
    "height":"100%",
    "width":"100%",
    "top":"0",
    "left":"0",
    "marginTop":"1.5rem"
};

export default Fog;