const places = [
  {
    title: 'Prescriptions',
    description:
      "Every pill in your collection plus details on ideal preparation and administration.",
    imageUrl: process.env.PUBLIC_URL + '/assets/pillcontainers.jpg',
    time: 1500,
  },
  {
    title: 'Calendar',
    description:
      'Monthly glance for when and what prescription to take. Times can vary per medication and it is best to take accordingly. ',
    imageUrl: process.env.PUBLIC_URL + '/assets/pilltime.jpg',
    time: 1500,
  },
  {
    title: 'Login',
    description:
      'Sign in in order to monitor the course of treatment, add a new prescription, and manage the status of certain drugs.',
    // imageUrl: process.env.PUBLIC_URL + '/assets/pilltime.jpg',
    time: 1500,
  },
];

export default places;
