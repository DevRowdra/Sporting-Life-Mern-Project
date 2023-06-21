export const userDataSave = (user) => {
  const currentUser = {
    email: user.email,
    role: 'student',
    name: user.displayName,
    userImage: user.photoURL,
  };
  fetch(`https://assignment-server-site-gold.vercel.app/user/${user?.email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
