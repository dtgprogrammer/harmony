
import "./Song.css";

export function Song({ auth, image, name, isPlaying, current }) {

    return (
        <div style={{ cursor: "pointer" }}>

            <div className="song" style={{
                margin: "10px",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: ((current[0] === name) && isPlaying) ? "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px" : ""
            }} >
                <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <img src={image} width={"150px"} alt="song art" />
                </div>

                <h3 style={{ color: "white", fontFamily: 'arial', fontWeight: '100', fontSize: '15px' }}>{name}</h3>
                <h4 style={{ fontFamily: 'arial', fontWeight: '100', fontSize: '12px' }}>{auth}</h4>
            </div>
        </div >
    )
}