import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import Register from '../../assets/Register.json';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { userDataSave } from '../../hook/useAuth';
const SingUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { updateUserProfile, createUser, setPhoto } = useContext(AuthContext);
  const navigate=useNavigate()
  const [error, setError] = useState('');
  const imgkey = import.meta.env.VITE_IMGKEY;
  console.log(imgkey);
  const imageHostLink = `https://api.imgbb.com/1/upload?key=${imgkey}`;
  const onSubmit = (data) => {
    setError('');
    if (data.password !== data.confirm) {
      setError("password don't match");
      return;
    }
    console.log(data);

    const file = data.photo[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(imageHostLink, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imageLink = imageResponse.data.display_url;

          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              updateUserProfile(data.name, imageLink)
                .then(() => {
                  setPhoto(imageLink);
                  //
                  const user = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: imageLink,
                  };
                  userDataSave(user);
                  console.log('user updated');
                })
                .catch((error) => {
                  console.log(error.message);
                });
              console.log(user);
            })
            .catch((error) => {
              console.log(error.message);
            });
            navigate("/")
        }
      });

    
  };
  return (
    <>
      <div className=" min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center w-3/5 lg:text-left">
            <Lottie
              className="  "
              animationData={Register}
              loop={true}
            ></Lottie>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
            >
              <h1 className="text-5xl text-center  font-bold">Register now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">Please Enter name</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">Please Enter Email</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  {...register('password', {
                    required: true,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />

                {errors.password?.type === 'required' && (
                  <p className="text-red-500">password must be 6 characters</p>
                )}
                {errors.password?.type === 'pattern' && (
                  <p className="text-red-500">
                    password must have one capital letter one number and one
                    small letter
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="text"
                  placeholder="confirm"
                  className="input input-bordered"
                  {...register('confirm', { required: true })}
                />

                {errors.confirm?.type === 'required' && (
                  <p className="text-red-500">password must be 6 characters</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="file"
                  placeholder="photo"
                  className="input input-bordered"
                  {...register('photo', { required: true })}
                />

                {errors.photo?.type === 'required' && (
                  <p className="text-red-500">please enter photo url</p>
                )}
              </div>
              <p className="text-red-500">{error}</p>
              <p>
                Already Have an Account <Link to={'/login'}>Login now</Link>
              </p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <GoogleLogin></GoogleLogin>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingUp;
