import Slide1 from "../components/Slide1"
import Slide2 from "../components/Slide2"
import Slide3 from "../components/Slide3"

const FrontPage = () => {
  return (
    <div className="bg-black w-full h-screen flex fixed">
     <div className="bg-black flex-1"><Slide1 /></div>
     <div className="bg-[#0c0c0c] flex-4"><Slide2 /></div>
     <div className="bg-black flex-1 border-2 border-white/10"><Slide3 /></div>
    </div>
  )
}

export default FrontPage