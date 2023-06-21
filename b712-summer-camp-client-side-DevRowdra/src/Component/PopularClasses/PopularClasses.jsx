import React, { useEffect, useState } from 'react';
import SingleCart from '../SingleCart/SingleCart';
import { JackInTheBox } from 'react-awesome-reveal';

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('https://assignment-server-site-gold.vercel.app/topclasses')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      });
  }, []);
  return (
    <>
      <JackInTheBox>
        <h1 className="text-center font-semibold text-3xl text-black m-10">
          Popular Classes{' '}
        </h1>
      </JackInTheBox>

      <hr></hr>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {classes.map((item) => (
          <SingleCart
            key={item._id}
            item={item}
          ></SingleCart>
        ))}
      </div>
    </>
  );
};

export default PopularClasses;
