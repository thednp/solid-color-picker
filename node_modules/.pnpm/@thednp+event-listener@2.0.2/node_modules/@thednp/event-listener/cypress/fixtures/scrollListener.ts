const scrollListener = function ({ target, currentTarget }: Event) {
  console.log('scrollListener', { this: this, target, currentTarget });
};

export default scrollListener;
