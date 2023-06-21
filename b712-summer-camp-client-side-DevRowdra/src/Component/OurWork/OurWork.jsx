import React from 'react';
import { BiFootball } from 'react-icons/bi';
import { MdSportsCricket, MdSportsMartialArts } from 'react-icons/md';
import { TbYoga } from 'react-icons/tb';
// import { MdSportsMartialArts } from 'react-icons/md';
import { Fade, Zoom } from "react-awesome-reveal";
import { FaBasketballBall, FaTableTennis } from 'react-icons/fa';

const OurWork = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(https://cdn.stocksnap.io/img-thumbs/960w/basketball-ball_M4TKS2J4JW.jpg)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60">
          <div className="grid grid-cols-3">
            <div>
              <img
                className="h-[450px] mt-24 ms-32"
                src="https://img.freepik.com/free-photo/full-shot-man-holding-trophy_23-2150465428.jpg?w=360&t=st=1686494954~exp=1686495554~hmac=606bdd60dee08804195ec8d6e3f22c73ae51fd870421b89c6154da26c8f2fab3"
                alt=""
              />
            </div>
            <div className="col-span-2 items-center">
              <div className="flex justify-center items-center mt-20">
                <div className="ms-3">
                  <Fade cascade damping={0.1}>
                  <h1 className="text-yellow-500 font-semibold text-3xl">
                    Why Choose Us
                  </h1>
                  <h1 className="text-6xl text-white">
                    Putting Student First, Every Game, Every Time.
                  </h1>
                  </Fade>
                  
                  
                </div>
                
              </div>
              <div className='grid grid-cols-2 mt-7 ms-4 gap-5'>

<div  className=' h-24 ' >
<div className='flex items-center'>
<Zoom>
<BiFootball className=' text-yellow-500 text-6xl '></BiFootball>
<h1 className='text-3xl uppercase font-semibold text-white ms-3'>football</h1>
</Zoom>

</div>

<p className='text-white text-base'>Kick, run, and score goals with the spirit of Football.</p>
</div>
<div  className=' h-24 ' >
<div className='flex items-center'>
  <Zoom>
  <MdSportsCricket className=' text-yellow-500 text-6xl '></MdSportsCricket>
<h1 className='text-3xl uppercase font-semibold text-white ms-3'>Cricket</h1>

  </Zoom>

</div>
<p className='text-white text-base'>Play with passion and master the game of Cricket.</p>
</div>
{/* <div  className=' h-24 ' >
<div className='flex items-center'>
  <Zoom>
  <TbYoga className=' text-yellow-500 text-6xl '></TbYoga>
<h1 className='text-3xl uppercase font-semibold text-white ms-3'>Yoga</h1>

  </Zoom>

</div>
<p className='text-white text-base'>Find balance, strength, and peace through Yoga.</p>
</div> */}
<div  className=' h-24 ' >
<div className='flex items-center'>

  <Zoom>
  <FaBasketballBall className=' text-yellow-500 text-6xl '></FaBasketballBall>
<h1 className='text-3xl uppercase font-semibold text-white ms-3'>Basketball</h1>

  </Zoom>

</div>
<p className='text-white text-base'>"Dribble, shoot, and score with Basketball.</p>
</div>
<div  className=' h-24 ' >
<div className='flex items-center'>

  <Zoom>

  <FaTableTennis className=' text-yellow-500 text-6xl '></FaTableTennis>
<h1 className='text-3xl uppercase font-semibold text-white ms-3'>Tennis</h1>
  </Zoom>

</div>
<p className='text-white text-base'>Serve, swing, and conquer the court with Tennis</p>
</div>
<div  className=' h-24 ' >
<div className='flex items-center'>
  <Zoom>

  <MdSportsMartialArts className=' text-yellow-500 text-6xl '></MdSportsMartialArts>
<h1 className='text-3xl uppercase font-semibold text-white ms-3'>MartialArts</h1>
  </Zoom>

</div>
<p className='text-white text-base'>Unleash your inner warrior with Martial Arts.</p>
</div>



              </div>
            </div>
          </div>
        </div>
        <></>
      </div>
    </div>
  );
};

export default OurWork;
