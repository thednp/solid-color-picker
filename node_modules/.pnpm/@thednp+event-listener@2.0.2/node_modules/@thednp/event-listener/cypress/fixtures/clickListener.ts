const clickListener = function ({ target, currentTarget }) {
  console.log('clickListener', { this: this, target, currentTarget });
  target.innerHTML = '<b>click</b>';
};

export default clickListener;
