type RedProp = {
    color?: string ;
    size?: number
}
export default function Red( {color="red",size=80}:RedProp) {
    return (
        <div style={{backgroundColor:color,width:size,height:size

        }} className="  rounded-full ">

        </div>
    )
}
