import { Avatar } from "@mui/material";
import rankingGoldImage from "../assets/avatar-1st.png";
import rankingSilverImage from "../assets/avatar-2nd.png";
import rankingBronzeImage from "../assets/avatar-3rd.png";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import {Icon} from "@mui/material";
export default function RankingCard({ user ,cardClass ,height,ranking}) {
  return (
    <div className="ranking-card bg-white w-1/5 m-5 drop-shadow-lg" style={{height:height}} >
      <div className="p-10 flex flex-col justify-center items-center">
        <div className={ `  w-full	 border flex flex-row items-center justify-center rounded-lg ${ranking=='gold'?' bg-yellow-100':ranking=='silver'?'bg-gray-100':'bg-brown-100'}`}>
          <div className="px-1"><StarOutlinedIcon sx={{color:`${ranking=='gold'?'gold':ranking=='silver'?'silver':'saddlebrown'}`}}color="inherit"></StarOutlinedIcon></div>
          <div className="px-1">name</div>
          <div className="px-1"><StarOutlinedIcon sx={{color:`${ranking=='gold'?'gold':ranking=='silver'?'silver':'saddlebrown'}`}}color="inherit"></StarOutlinedIcon></div>
        </div>
        <div>
          <Avatar sx={{height:200,width:200}} alt="Remy Sharp" src={image} />
        </div>
        <div className="-mt-16"><img alt="ranking" src={ranking=='gold'?rankingGoldImage:ranking=='silver'?rankingSilverImage:rankingBronzeImage}></img></div>
        <div>
        <div className="mt-12 text-xl text-gray-500">Learned Courses: 321321</div>
        <div className=" text-xl text-gray-500">Socre:  321321</div>
        </div>
       
      </div>
    </div>
  );
}
